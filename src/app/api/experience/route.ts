import { getDatabase } from "@/lib/db";
import { Experience } from "@/types/Experience";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam) : 0;

    const db = await getDatabase();
    const experiences = await db
      .collection<Experience>("experiences")
      .find({})
      .sort({ date: -1 })
      .limit(limit)
      .toArray();

    const data = experiences.map((exp) => ({
      ...exp,
      _id: exp._id?.toString(),
    }));

    return NextResponse.json(
      { message: "Success", data },
      { status: 200 }
    );
}
