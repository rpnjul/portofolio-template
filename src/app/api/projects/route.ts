import { db } from "@/lib/db";
import { Projects } from "@/types/Projects";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : undefined;

    const [rows] = await db.query(
      `SELECT * FROM projects ${limit ? " LIMIT ?" : ""}`,
      limit ? [limit] : []
    );

    const rawProjects = rows as Projects[];
    const projects = rawProjects.map((project) => ({
      ...project,
      tech_map: project.tech?.split(",") ?? [],
      cover: process.env.NEXT_PUBLIC_BASE_URL + project.cover,
      icon: process.env.NEXT_PUBLIC_BASE_URL + project.icon
    }));
    console.log('projects',projects)
    
    return NextResponse.json(
        { message: "Success", data: projects },
        { status: 200 }
    )
}