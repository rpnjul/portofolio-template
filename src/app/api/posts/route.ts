import { db } from "@/lib/db";
import { PostsData } from "@/types/Posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;
    const [rows] = await db.query(
      `SELECT * FROM posts ORDER BY post_id DESC ${limit ? " LIMIT ?" : ""}`,
      limit ? [limit] : []
    );

    const data = rows as PostsData[];
    
    return NextResponse.json(
      { message: "Success", data: data },
      { status: 200 }
    );
}