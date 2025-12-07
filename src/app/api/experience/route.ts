import { getDatabase } from "@/lib/db";
import { Experience } from "@/types/Experience";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, unauthorizedResponse } from "@/middlewares/auth";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 0;

    const db = await getDatabase();
    const experiences = await db
      .collection<Experience>("experiences")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    const data = experiences.map((exp) => ({
      ...exp,
      _id: exp._id?.toString(),
    }));

    return NextResponse.json(
      { message: "Success", status: true, data },
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
    const { company, job, link, description, date } = body;

    if (!company || !job || !date) {
      return NextResponse.json(
        { message: "Company, job, and date are required", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db.collection<Experience>("experiences").insertOne({
      company,
      job,
      link: link || "",
      description: description || "",
      date,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Experience created successfully",
        status: true,
        data: { _id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { message: "Failed to create experience", status: false },
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
    const { _id, company, job, link, description, date } = body;

    if (!_id) {
      return NextResponse.json(
        { message: "Experience ID is required", status: false },
        { status: 400 }
      );
    }

    const updateData: Record<string, string> = {};
    if (company !== undefined) updateData.company = company;
    if (job !== undefined) updateData.job = job;
    if (link !== undefined) updateData.link = link;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = date;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: "No fields to update", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db
      .collection<Experience>("experiences")
      .updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Experience not found", status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Experience updated successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { message: "Failed to update experience", status: false },
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
    const _id = searchParams.get("_id");

    if (!_id) {
      return NextResponse.json(
        { message: "Experience ID is required", status: false },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const result = await db
      .collection<Experience>("experiences")
      .deleteOne({ _id: new ObjectId(_id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Experience not found", status: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Experience deleted successfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting experience:", error);
    return NextResponse.json(
      { message: "Failed to delete experience", status: false },
      { status: 500 }
    );
  }
}