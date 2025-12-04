import { getDatabase } from "@/lib/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/types/Users";

const SECRET = process.env.JWT_SECRET || "defaultsecret";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();
        if (!username || !password) {
            return NextResponse.json(
                { message: "Email dan password wajib diisi" },
                { status: 400 }
            );
        }

        const db = await getDatabase();
        const user = await db.collection<User>("users").findOne({ username });

        if (!user) {
            return NextResponse.json(
                { message: "User tidak ditemukan" },
                { status: 404 }
            );
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ message: "Password salah", status: false }, { status: 200 });
        }

        const token = jwt.sign(
            { id: user._id?.toString(), username: user.username, name: user.name },
            SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json(
            { message: "Login berhasil", token, status: true },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
