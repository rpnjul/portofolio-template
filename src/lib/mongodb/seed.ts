import { Db } from "mongodb";
import bcrypt from "bcryptjs";
import { User } from "@/types/Users";

export async function seedDatabase(db: Db): Promise<void> {
  console.log("🌱 Starting database seeding...");

  try {
    await seedUsers(db);
    console.log("✅ Database seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

async function seedUsers(db: Db): Promise<void> {
  const usersCollection = db.collection<User>("users");
  const userCount = await usersCollection.countDocuments();

  if (userCount === 0) {
    console.log("📝 Seeding default admin user...");

    const defaultUsername = process.env.DEFAULT_ADMIN_USERNAME || "admin";
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "admin123";
    const defaultName = process.env.DEFAULT_ADMIN_NAME || "Administrator";

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    await usersCollection.insertOne({
      username: defaultUsername,
      name: defaultName,
      password: hashedPassword,
      avatar: "",
    } as User);

    console.log(`✅ Admin user created: ${defaultUsername}`);
    console.log(`⚠️  Default password: ${defaultPassword}`);
    console.log("⚠️  PLEASE CHANGE THE DEFAULT PASSWORD!");
  } else {
    console.log("👤 Users collection already has data, skipping seed");
  }
}

export async function getSeedStatus(db: Db): Promise<{
  users: number;
  posts: number;
  projects: number;
  experiences: number;
}> {
  const usersCount = await db.collection("users").countDocuments();
  const postsCount = await db.collection("posts").countDocuments();
  const projectsCount = await db.collection("projects").countDocuments();
  const experiencesCount = await db.collection("experiences").countDocuments();

  return {
    users: usersCount,
    posts: postsCount,
    projects: projectsCount,
    experiences: experiencesCount,
  };
}
