import { getDatabase } from "@/lib/db";
import { runMigrations, getMigrationStatus } from "@/lib/mongodb/migrations";
import { seedDatabase, getSeedStatus } from "@/lib/mongodb/seed";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, unauthorizedResponse } from "@/middlewares/auth";

export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyToken(req);
    if (!authResult.valid) {
      return unauthorizedResponse(authResult.error);
    }

    const db = await getDatabase();
    const migrationStatus = await getMigrationStatus(db);
    const seedStatus = await getSeedStatus(db);

    return NextResponse.json(
      {
        message: "Migration status retrieved successfully",
        status: true,
        data: {
          migrations: migrationStatus,
          seeds: seedStatus,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting migration status:", error);
    return NextResponse.json(
      { message: "Failed to get migration status", status: false },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await verifyToken(req);
    if (!authResult.valid) {
      return unauthorizedResponse(authResult.error);
    }

    const body = await req.json();
    const { action } = body; // 'migrate' or 'seed' or 'both'

    const db = await getDatabase();
    const results: any = {};

    if (action === "migrate" || action === "both") {
      console.log("Running migrations manually...");
      await runMigrations(db);
      results.migrations = "completed";
    }

    if (action === "seed" || action === "both") {
      console.log("Running seeding manually...");
      await seedDatabase(db);
      results.seeding = "completed";
    }

    return NextResponse.json(
      {
        message: "Migration executed successfully",
        status: true,
        data: results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error running migration:", error);
    return NextResponse.json(
      { message: "Failed to run migration", status: false, error: String(error) },
      { status: 500 }
    );
  }
}
