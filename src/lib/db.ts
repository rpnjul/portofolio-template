import { MongoClient, Db } from 'mongodb';
import { runMigrations } from './mongodb/migrations';
import { seedDatabase } from './mongodb/seed';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'satriame';
const AUTO_MIGRATE = process.env.AUTO_MIGRATE !== 'false'; // Default true
const AUTO_SEED = process.env.AUTO_SEED !== 'false'; // Default true

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;
let migrationRun = false;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  console.log('🔌 Connecting to MongoDB...');
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  console.log('✅ Connected to MongoDB');

  // Run migrations and seeding only once
  if (!migrationRun) {
    if (AUTO_MIGRATE) {
      try {
        await runMigrations(db);
      } catch (error) {
        console.error('Migration error:', error);
      }
    }

    if (AUTO_SEED) {
      try {
        await seedDatabase(db);
      } catch (error) {
        console.error('Seeding error:', error);
      }
    }

    migrationRun = true;
  }

  return { client, db };
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase();
  return db;
}
