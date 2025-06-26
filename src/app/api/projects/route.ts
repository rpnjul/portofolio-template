import { db } from "@/lib/db";
import { Projects } from "@/types/Projects";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
    const [rows] = await db.query(
        "SELECT * FROM projects"
    );

    const rawProjects = rows as Projects[];
    const projects = rawProjects.map((project) => ({
      ...project,
      tech_map: project.tech?.split(",") ?? [],
    }));
    
    return NextResponse.json(
        { message: "Success", data: projects },
        { status: 200 }
    )
}