import { db } from "@/lib/db";
import { Experience } from "@/types/Experience";
import { Projects } from "@/types/Projects";
import { NextResponse } from "next/server";



export async function GET(req: Request) {
    const [rows] = await db.query(
        "SELECT * FROM experiences ORDER BY exp_id DESC"
    );

    const exp = rows as Experience[];
    
    return NextResponse.json(
      { message: "Success", data: exp },
      { status: 200 }
    );
}