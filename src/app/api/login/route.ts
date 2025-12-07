import { getDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/types/Users";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('CRITICAL SECURITY ERROR: JWT_SECRET environment variable is not set!');
}

// In-memory store for login attempts (use Redis in production)
const loginAttempts = new Map<string, { count: number; lastAttempt: number; lockedUntil?: number }>();
const MAX_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes
const ATTEMPT_WINDOW = 5 * 60 * 1000; // 5 minutes

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        // Input validation
        if (!username || !password) {
            return NextResponse.json(
                { message: "Username dan password wajib diisi", status: false },
                { status: 400 }
            );
        }

        // Get client IP for rate limiting
        const clientIp = req.headers.get('x-forwarded-for') ||
                        req.headers.get('x-real-ip') ||
                        'unknown';
        const attemptKey = `${clientIp}:${username}`;

        // Check if account is locked
        const attempts = loginAttempts.get(attemptKey);
        const now = Date.now();

        if (attempts?.lockedUntil && now < attempts.lockedUntil) {
            const remainingTime = Math.ceil((attempts.lockedUntil - now) / 1000 / 60);
            console.warn(`[SECURITY] Locked login attempt for ${username} from ${clientIp}`);
            return NextResponse.json(
                {
                    message: `Terlalu banyak percobaan login. Coba lagi dalam ${remainingTime} menit.`,
                    status: false
                },
                { status: 429 }
            );
        }

        const db = await getDatabase();
        const user = await db.collection<User>("users").findOne({ username });

        // IMPORTANT: Don't reveal whether user exists or not (prevent username enumeration)
        // Always check password even if user doesn't exist
        const isValid = user ? await bcrypt.compare(password, user.password) : false;

        if (!user || !isValid) {
            // Track failed attempt
            const currentAttempts = attempts?.count || 0;
            const newCount = currentAttempts + 1;

            if (newCount >= MAX_ATTEMPTS) {
                loginAttempts.set(attemptKey, {
                    count: newCount,
                    lastAttempt: now,
                    lockedUntil: now + LOCK_TIME
                });
                console.warn(`[SECURITY] Account locked for ${username} from ${clientIp} after ${newCount} attempts`);
                return NextResponse.json(
                    {
                        message: `Terlalu banyak percobaan login. Akun dikunci selama ${LOCK_TIME / 60000} menit.`,
                        status: false
                    },
                    { status: 429 }
                );
            } else {
                loginAttempts.set(attemptKey, {
                    count: newCount,
                    lastAttempt: now
                });
            }

            console.warn(`[SECURITY] Failed login attempt ${newCount}/${MAX_ATTEMPTS} for ${username} from ${clientIp}`);

            // Generic error message - don't reveal if username or password is wrong
            return NextResponse.json(
                {
                    message: "Username atau password salah",
                    status: false
                },
                { status: 401 }
            );
        }

        // Successful login - clear attempts
        loginAttempts.delete(attemptKey);

        const token = jwt.sign(
            { id: user._id?.toString(), username: user.username, name: user.name },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.info(`[SECURITY] Successful login for ${username} from ${clientIp}`);

        return NextResponse.json(
            { message: "Login berhasil", token, status: true },
            { status: 200 }
        );
    } catch (err) {
        console.error('[SECURITY] Login error:', err);
        return NextResponse.json(
            { message: "Terjadi kesalahan server", status: false },
            { status: 500 }
        );
    }
}

// Cleanup old entries periodically
setInterval(() => {
    const now = Date.now();
    loginAttempts.forEach((value, key) => {
        if (value.lockedUntil && now > value.lockedUntil + ATTEMPT_WINDOW) {
            loginAttempts.delete(key);
        }
    });
}, 60 * 1000); // Run every minute
