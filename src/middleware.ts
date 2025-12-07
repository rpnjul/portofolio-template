import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rate limiting store (in-memory, for production use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT = 100; // requests per window
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "font-src 'self' data:; " +
    "connect-src 'self'; " +
    "frame-ancestors 'none';"
  );

  // Rate Limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const now = Date.now();
    const clientData = requestCounts.get(ip);

    if (clientData) {
      if (now < clientData.resetTime) {
        if (clientData.count >= RATE_LIMIT) {
          return new NextResponse(
            JSON.stringify({ error: 'Too many requests. Please try again later.' }),
            {
              status: 429,
              headers: {
                'Content-Type': 'application/json',
                'Retry-After': String(Math.ceil((clientData.resetTime - now) / 1000))
              }
            }
          );
        }
        clientData.count++;
      } else {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
      }
    } else {
      requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    }

    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance to cleanup
      const keysToDelete: string[] = [];
      requestCounts.forEach((value, key) => {
        if (now > value.resetTime + RATE_WINDOW) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach(key => requestCounts.delete(key));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
