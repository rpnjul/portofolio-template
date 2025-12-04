import { getDatabase } from "@/lib/db";
import { PostsData } from "@/types/Posts";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, unauthorizedResponse } from "@/middlewares/auth";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 0;

    const db = await getDatabase();
    const posts = await db
      .collection<PostsData>("posts")
      .find({})
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray();

    const data = posts.map((dt) => ({
      ...dt,
      _id: dt._id?.toString(),
      cover: dt.cover ? process.env.NEXT_PUBLIC_BASE_URL + dt.cover : "",
    }));

    return NextResponse.json(
      { message: "Success", data: data },
      { status: 200 }
    );
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await verifyToken(req);
    if (!authResult.valid) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await req.json();
    const { title, description, content, cover } = body;

    if (!title || !description || !content) {
      return NextResponse.json(
        { message: "Title, description, and content are required", status: false },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const db = await getDatabase();
    const newPost: Omit<PostsData, '_id'> = {
      slug,
      title,
      description,
      content,
      cover: cover || "",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection<PostsData>("posts").insertOne(newPost as PostsData);

    return NextResponse.json(
      {
        message: "Post created successfully",
        status: true,
        data: { _id: result.insertedId.toString(), ...newPost }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Failed to create post", status: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authResult = await verifyToken(req);
    if (!authResult.valid) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await req.json();
    const { _id, title, description, content, cover } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "Post ID is required", status: false },
        { status: 400 }
      );
    }

    const updateData: any = { updated_at: new Date() };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (cover !== undefined) updateData.cover = cover;

    if (Object.keys(updateData).length === 1) {
      return NextResponse.json(
        { message: "No fields to update", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection<PostsData>("posts").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return NextResponse.json(
      { message: "Post updated successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Failed to update post", status: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await verifyToken(req);
    if (!authResult.valid) {
      return unauthorizedResponse(authResult.error);
    }

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("_id");

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection<PostsData>("posts").deleteOne({ _id: new ObjectId(postId) });

    return NextResponse.json(
      { message: "Post deleted successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Failed to delete post", status: false },
      { status: 500 }
    );
  }
}
