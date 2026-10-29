import MongoStore from "connect-mongo";
import type { SessionData } from "express-session";
import { MongoClient, MongoServerError } from "mongodb";
import type { Db } from "mongodb";
import type {
  AlbumDocument, ArtistDocument, FavouriteDocument,
  SessionDocument, TrackDocument, UserDocument,
} from "./models.ts";
import { indexes, validators } from "./schema.ts";

export const DATABASE_NAME = "streaming";

export function getCollections(db: Db) {
  return {
    users: db.collection<UserDocument>("users"),
    artists: db.collection<ArtistDocument>("artists"),
    albums: db.collection<AlbumDocument>("albums"),
    tracks: db.collection<TrackDocument>("tracks"),
    favourites: db.collection<FavouriteDocument>("favourites"),
    sessions: db.collection<SessionDocument>("sessions"),
  };
}

export type Collections = ReturnType<typeof getCollections>;

/** Creates collections and indexes only. Never inserts, clears, or seeds data. */
export async function initializeDatabase(client: MongoClient, databaseName = DATABASE_NAME) {
  const db = client.db(databaseName);
  for (const [name, validator] of Object.entries(validators)) {
    const options = { validator, validationLevel: "strict" as const, validationAction: "error" as const };
    try {
      await db.createCollection(name, options);
    } catch (error) {
      if (!(error instanceof MongoServerError) || error.code !== 48) throw error;
      // Re-running setup updates validation without deleting existing documents.
      await db.command({ collMod: name, ...options });
    }
  }
  for (const [name, definitions] of Object.entries(indexes)) {
    await db.collection(name).createIndexes(definitions);
  }

  const sessionStore = MongoStore.create<SessionData & { userId: string }>({
    client,
    dbName: databaseName,
    collectionName: "sessions",
    stringify: false,
    autoRemove: "native",
    ttl: 7 * 24 * 60 * 60,
  });
  // Public readiness promise: connect-mongo creates its own expires TTL index.
  await sessionStore.collectionP;
  return { db, collections: getCollections(db), sessionStore };
}

export async function connectDatabase(uri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017") {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const database = await initializeDatabase(client);
    return { ...database, close: () => client.close() };
  } catch (error) {
    await client.close();
    throw error;
  }
}
