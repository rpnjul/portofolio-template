import { Db } from "mongodb";
import { collections, ensureCollectionExists } from "./schemas";

export async function runMigrations(db: Db): Promise<void> {
  console.log("🚀 Starting MongoDB migrations...");

  try {
    for (const schema of collections) {
      await ensureCollectionExists(db, schema);
    }

    console.log("✅ All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
}

export async function getMigrationStatus(db: Db): Promise<{
  total: number;
  existing: number;
  missing: string[];
}> {
  const existingCollections = await db.listCollections().toArray();
  const existingNames = existingCollections.map((col) => col.name);

  const requiredCollections = collections.map((schema) => schema.name);
  const missing = requiredCollections.filter(
    (name) => !existingNames.includes(name)
  );

  return {
    total: requiredCollections.length,
    existing: requiredCollections.length - missing.length,
    missing,
  };
}
