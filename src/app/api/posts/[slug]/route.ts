import { getDatabase } from "@/lib/db";
import { PostsData } from "@/types/Posts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split("/").pop();

  if (!slug) {
    return NextResponse.json({ message: "Slug not found",status: false }, { status: 404 });
  }
  try{
    const db = await getDatabase();
    const post = await db.collection<PostsData>("posts").findOne({ slug });

    if (!post) {
        return NextResponse.json(
            { message: "Post not found", status: false },
            { status: 404 }
        );
    }

    const defaultCover = process.env.NEXT_PUBLIC_BASE_URL + "/assets/img/post-cover.jpg";
    const formatted = {
        ...post,
        _id: post._id?.toString(),
        cover: post.cover ? process.env.NEXT_PUBLIC_BASE_URL + post.cover : defaultCover,
    };

    return NextResponse.json(
        { message: "Success", data: formatted, status: true },
        { status: 200 }
    );
  } catch (error) {
    console.error("GET post by slug error:", error);
    return NextResponse.json(
      { message: "Internal Server Error",messages: error, status: false },
      { status: 500 }
    );
  }
}
