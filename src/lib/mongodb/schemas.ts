import { Db } from "mongodb";

export interface CollectionSchema {
  name: string;
  indexes?: {
    key: Record<string, 1 | -1>;
    unique?: boolean;
    name?: string;
  }[];
  validator?: any;
}

export const collections: CollectionSchema[] = [
  {
    name: "users",
    indexes: [
      {
        key: { username: 1 },
        unique: true,
        name: "username_unique",
      },
    ],
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "name", "password"],
        properties: {
          username: {
            bsonType: "string",
            description: "Username must be a string and is required",
          },
          name: {
            bsonType: "string",
            description: "Name must be a string and is required",
          },
          password: {
            bsonType: "string",
            description: "Password must be a string and is required",
          },
          avatar: {
            bsonType: "string",
            description: "Avatar must be a string",
          },
        },
      },
    },
  },
  {
    name: "posts",
    indexes: [
      {
        key: { slug: 1 },
        unique: true,
        name: "slug_unique",
      },
      {
        key: { created_at: -1 },
        name: "created_at_desc",
      },
    ],
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "description", "content", "slug", "created_at", "updated_at"],
        properties: {
          slug: {
            bsonType: "string",
            description: "Slug must be a string and is required",
          },
          title: {
            bsonType: "string",
            description: "Title must be a string and is required",
          },
          description: {
            bsonType: "string",
            description: "Description must be a string and is required",
          },
          content: {
            bsonType: "string",
            description: "Content must be a string and is required",
          },
          cover: {
            bsonType: "string",
            description: "Cover must be a string",
          },
          created_at: {
            bsonType: "date",
            description: "Created date must be a date and is required",
          },
          updated_at: {
            bsonType: "date",
            description: "Updated date must be a date and is required",
          },
        },
      },
    },
  },
  {
    name: "projects",
    indexes: [
      {
        key: { slug: 1 },
        unique: true,
        name: "slug_unique",
      },
      {
        key: { created_at: -1 },
        name: "created_at_desc",
      },
    ],
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["title", "description", "content", "slug", "created_at", "updated_at"],
        properties: {
          slug: {
            bsonType: "string",
            description: "Slug must be a string and is required",
          },
          title: {
            bsonType: "string",
            description: "Title must be a string and is required",
          },
          description: {
            bsonType: "string",
            description: "Description must be a string and is required",
          },
          content: {
            bsonType: "string",
            description: "Content must be a string and is required",
          },
          cover: {
            bsonType: "string",
            description: "Cover image path",
          },
          icon: {
            bsonType: "string",
            description: "Icon image path",
          },
          link: {
            bsonType: "string",
            description: "Project link",
          },
          tech: {
            bsonType: "string",
            description: "Technologies used (comma-separated)",
          },
          created_at: {
            bsonType: "date",
            description: "Created date must be a date and is required",
          },
          updated_at: {
            bsonType: "date",
            description: "Updated date must be a date and is required",
          },
        },
      },
    },
  },
  {
    name: "experiences",
    indexes: [
      {
        key: { date: -1 },
        name: "date_desc",
      },
    ],
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["company", "job", "description", "date"],
        properties: {
          company: {
            bsonType: "string",
            description: "Company name must be a string and is required",
          },
          job: {
            bsonType: "string",
            description: "Job title must be a string and is required",
          },
          link: {
            bsonType: "string",
            description: "Company link",
          },
          description: {
            bsonType: "string",
            description: "Job description must be a string and is required",
          },
          date: {
            bsonType: "string",
            description: "Date range must be a string and is required",
          },
        },
      },
    },
  },
];

export async function ensureCollectionExists(
  db: Db,
  schema: CollectionSchema
): Promise<void> {
  const existingCollections = await db
    .listCollections({ name: schema.name })
    .toArray();

  if (existingCollections.length === 0) {
    console.log(`Creating collection: ${schema.name}`);
    await db.createCollection(schema.name, {
      validator: schema.validator,
    });
  } else {
    console.log(`Collection already exists: ${schema.name}`);
  }

  // Create indexes
  if (schema.indexes && schema.indexes.length > 0) {
    const collection = db.collection(schema.name);
    const existingIndexes = await collection.listIndexes().toArray();
    const existingIndexNames = existingIndexes.map((idx) => idx.name);

    for (const index of schema.indexes) {
      const indexName = index.name || Object.keys(index.key).join("_");

      if (!existingIndexNames.includes(indexName)) {
        console.log(`Creating index: ${indexName} on ${schema.name}`);

        // Build index options, only include unique if it's true
        const indexOptions: any = { name: indexName };
        if (index.unique === true) {
          indexOptions.unique = true;
        }

        await collection.createIndex(index.key, indexOptions);
      } else {
        console.log(`Index already exists: ${indexName} on ${schema.name}`);
      }
    }
  }
}
