import { getDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, unauthorizedResponse } from "@/middlewares/auth";

export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyToken(req);
    if (!authResult.valid) {
      return unauthorizedResponse(authResult.error);
    }

    const db = await getDatabase();

    // Get counts from all collections
    const total_posts = await db.collection("posts").countDocuments();
    const total_projects = await db.collection("projects").countDocuments();
    const total_users = await db.collection("users").countDocuments();

    // Get recent posts
    const recentPosts = await db
      .collection("posts")
      .find({}, { projection: { _id: 1, title: 1, created_at: 1 } })
      .sort({ created_at: -1 })
      .limit(5)
      .toArray();

    // Get recent projects
    const recentProjects = await db
      .collection("projects")
      .find({}, { projection: { _id: 1, title: 1, created_at: 1 } })
      .sort({ created_at: -1 })
      .limit(5)
      .toArray();

    const stats = {
      total_posts,
      total_projects,
      total_users,
      recent_posts: recentPosts.map(p => ({ ...p, _id: p._id.toString() })),
      recent_projects: recentProjects.map(p => ({ ...p, _id: p._id.toString() })),
    };

    return NextResponse.json(
      { message: "Success", data: stats, status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { message: "Failed to fetch statistics", status: false },
      { status: 500 }
    );
  }
}
