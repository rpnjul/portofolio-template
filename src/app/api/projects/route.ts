import { getDatabase } from "@/lib/db";
import { Projects } from "@/types/Projects";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, unauthorizedResponse } from "@/middlewares/auth";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam) : 0;

  const db = await getDatabase();
  const projects = await db
    .collection<Projects>("projects")
    .find({})
    .sort({ created_at: -1 })
    .limit(limit)
    .toArray();

  const data = projects.map((project) => ({
    ...project,
    _id: project._id?.toString(),
    tech_map: project.tech?.split(",") ?? [],
    cover: project.cover ? process.env.NEXT_PUBLIC_BASE_URL + project.cover : "",
    icon: project.icon ? process.env.NEXT_PUBLIC_BASE_URL + project.icon : "",
  }));

  return NextResponse.json(
    { message: "Success", data },
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
    const { title, description, content, cover, icon, link, tech } = body;

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

    const techString = Array.isArray(tech) ? tech.join(',') : tech;

    const db = await getDatabase();
    const newProject: Omit<Projects, '_id'> = {
      slug,
      title,
      description,
      content,
      cover: cover || "",
      icon: icon || "",
      link: link || "",
      tech: techString || "",
      created_at: new Date(),
      updated_at: new Date(),
    };

    const result = await db.collection<Projects>("projects").insertOne(newProject as Projects);

    return NextResponse.json(
      {
        message: "Project created successfully",
        status: true,
        data: { _id: result.insertedId.toString(), ...newProject }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Failed to create project", status: false },
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
    const { _id, slug, title, description, content, cover, icon, link, tech } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "Project ID is required", status: false },
        { status: 400 }
      );
    }

    const updateData: any = { updated_at: new Date() };

    if (slug !== undefined) updateData.slug = slug;
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (cover !== undefined) updateData.cover = cover;
    if (icon !== undefined) updateData.icon = icon;
    if (link !== undefined) updateData.link = link;
    if (tech !== undefined) {
      updateData.tech = Array.isArray(tech) ? tech.join(',') : tech;
    }

    if (Object.keys(updateData).length === 1) {
      return NextResponse.json(
        { message: "No fields to update", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection<Projects>("projects").updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    return NextResponse.json(
      { message: "Project updated successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project", status: false },
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
    const projectId = searchParams.get("_id");

    if (!projectId) {
      return NextResponse.json(
        { message: "Project ID is required", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection<Projects>("projects").deleteOne({ _id: new ObjectId(projectId) });

    return NextResponse.json(
      { message: "Project deleted successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Failed to delete project", status: false },
      { status: 500 }
    );
  }
}
