import { db } from "@/lib/db";
import { Projects } from "@/types/Projects";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { pathname } = new URL(req.url);
  const slug = pathname.split("/").pop();

  if (!slug) {
    return NextResponse.json({ message: "Slug not found",status:false }, { status: 400 });
  }
  try{
    const [rows] = await db.query(
      "SELECT * FROM projects WHERE slug = ?",
      [slug]
    );
    if ((rows as Projects[]).length === 0) {
        return NextResponse.json(
          { message: "Project not found", status: false },
          { status: 404 }
        );
    }
    const project = (rows as Projects[])[0];
    const formatted = {
      ...project,
      tech_map: project.tech?.split(",") ?? [],
      cover: `${process.env.NEXT_PUBLIC_BASE_URL}${project.cover}`,
      icon: `${process.env.NEXT_PUBLIC_BASE_URL}${project.icon}`,
    };

    return NextResponse.json(
      { message: "Success", data: formatted, status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET project_id error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", messages: error, status: false },
      { status: 500 }
    );
  }
}
