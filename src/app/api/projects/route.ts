import { db } from "@/lib/db";
import { Projects } from "@/types/Projects";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam) : undefined;

  let query = `SELECT * FROM projects`;
  const params: (number | string)[] = [];

  query += ` ORDER BY project_id DESC`;

  if (limit) {
    query += ` LIMIT ?`;
    params.push(limit);
  }

  const [rows] = await db.query(query, params);

  const rawProjects = rows as Projects[];
  const projects = rawProjects.map((project) => ({
    ...project,
    tech_map: project.tech?.split(",") ?? [],
    cover: process.env.NEXT_PUBLIC_BASE_URL + project.cover,
    icon: process.env.NEXT_PUBLIC_BASE_URL + project.icon,
  }));

  return NextResponse.json(
    { message: "Success", data: projects },
    { status: 200 }
  );
}
