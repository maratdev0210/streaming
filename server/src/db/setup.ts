import { connectDatabase } from "./database.ts";

try {
  const database = await connectDatabase();
  try {
    const counts = Object.fromEntries(await Promise.all(
      Object.entries(database.collections).map(async ([name, collection]) =>
        [name, await collection.countDocuments()] as const),
    ));
    console.log("MongoDB streaming collections and indexes are ready.");
    console.table(counts);
  } finally {
    await database.close();
  }
} catch (error) {
  // Avoid printing connection URIs, which can contain credentials.
  console.error("Database setup failed. Check MONGODB_URI, MongoDB availability, and database permissions.");
  console.error(error instanceof Error ? error.name : "Unknown error");
  process.exitCode = 1;
}
