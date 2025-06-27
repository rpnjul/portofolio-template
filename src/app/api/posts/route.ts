import { db } from "@/lib/db";
import { PostsData } from "@/types/Posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const [rows] = await db.query(
        "SELECT * FROM posts ORDER BY post_id DESC"
    );

    const data = rows as PostsData[];
    
    return NextResponse.json(
      { message: "Success", data: data },
      { status: 200 }
    );
}