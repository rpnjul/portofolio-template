import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'SATRIAAPRILIAN48GMAILCOM';

export interface AuthRequest extends NextRequest {
  user?: {
    id: number;
    username: string;
    name: string;
  };
}

export async function verifyToken(request: NextRequest): Promise<{ valid: boolean; user?: any; error?: string }> {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { valid: false, error: 'No token provided' };
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; username: string; name: string };

    return { valid: true, user: decoded };
  } catch (error) {
    return { valid: false, error: 'Invalid or expired token' };
  }
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return NextResponse.json(
    { message, status: false },
    { status: 401 }
  );
}
