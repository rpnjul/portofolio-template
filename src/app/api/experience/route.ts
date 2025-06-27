import { db } from "@/lib/db";
import { Experience } from "@/types/Experience";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;

    const [rows] = await db.query(
      `SELECT * FROM experiences ORDER BY exp_id DESC ${
        limit ? " LIMIT ?" : ""
      }`,
      limit ? [limit] : []
    );

    const exp = rows as Experience[];
    
    return NextResponse.json(
      { message: "Success", data: exp },
      { status: 200 }
    );
}