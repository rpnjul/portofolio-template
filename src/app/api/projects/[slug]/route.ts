import { getDatabase } from "@/lib/db";
import { Projects } from "@/types/Projects";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split("/").pop();

  if (!slug) {
    return NextResponse.json({ message: "Slug not found",status:false }, { status: 400 });
  }
  try{
    const db = await getDatabase();
    const project = await db.collection<Projects>("projects").findOne({ slug });

    if (!project) {
        return NextResponse.json(
          { message: "Project not found", status: false },
          { status: 404 }
        );
    }

    const formatted = {
      ...project,
      _id: project._id?.toString(),
      tech_map: project.tech?.split(",") ?? [],
      cover: project.cover ? `${process.env.NEXT_PUBLIC_BASE_URL}${project.cover}` : "",
      icon: project.icon ? `${process.env.NEXT_PUBLIC_BASE_URL}${project.icon}` : "",
    };

    return NextResponse.json(
      { message: "Success", data: formatted, status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET project by slug error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", messages: error, status: false },
      { status: 500 }
    );
  }
}
