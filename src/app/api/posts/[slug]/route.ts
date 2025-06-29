import { db } from "@/lib/db";
import { PostsData } from "@/types/Posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split("/").pop();

  if (!slug) {
    return NextResponse.json({ message: "Slug not found",status: false }, { status: 404 });
  }
  try{
    const [rows] = await db.query("SELECT * FROM posts WHERE slug = ?", [slug]);
    if ((rows as PostsData[]).length === 0) {
        return NextResponse.json(
            { message: "Posts not found", status: false },
            { status: 404 }
        );
    }
    const defaultCover =
      process.env.NEXT_PUBLIC_BASE_URL + "/assets/img/post-cover.jpg";
    const posts = (rows as PostsData[])[0];
    const formatted = {
        ...posts,
        cover: posts.cover ? process.env.NEXT_PUBLIC_BASE_URL + posts.cover : defaultCover,
    };

    return NextResponse.json(
        { message: "Success", data: formatted, status: true },
        { status: 200 }
    );
  } catch (error) {
    console.error("GET project_id error:", error);
    return NextResponse.json(
      { message: "Internal Server Error",messages: error, status: false },
      { status: 500 }
    );
  }
}
