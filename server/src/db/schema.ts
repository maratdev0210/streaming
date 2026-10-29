import type { Document, IndexDescription } from "mongodb";

const text = { bsonType: "string", minLength: 1 };
const catalogId = {
  bsonType: ["int", "long", "double"],
  minimum: 1,
  maximum: Number.MAX_SAFE_INTEGER,
  multipleOf: 1,
};
// References are relative paths inside STORAGE_ROOT, never URLs or media bytes.
const filePath = {
  ...text,
  pattern: "^(?!/)(?!.*(?:^|/)\\.\\.(?:/|$))(?!.*[:\\\\]).+$",
};
const timestamps = {
  createdAt: { bsonType: "date" },
  updatedAt: { bsonType: "date" },
};

function schema(properties: Document, required: string[]): Document {
  return {
    $jsonSchema: {
      bsonType: "object",
      additionalProperties: false,
      required: ["_id", ...required],
      properties: { _id: { bsonType: "objectId" }, ...properties },
    },
  };
}

export const validators = {
  users: schema({
    email: { ...text, pattern: "^[^\\s@A-Z]+@[^\\s@A-Z]+\\.[^\\s@A-Z]+$" },
    name: { ...text, minLength: 2 },
    passwordHash: text,
    ...timestamps,
  }, ["email", "name", "passwordHash", "createdAt", "updatedAt"]),
  artists: schema({
    id: catalogId, name: text, coverPath: filePath, ...timestamps,
  }, ["id", "name", "coverPath", "createdAt", "updatedAt"]),
  albums: schema({
    id: catalogId, title: text, artistId: catalogId,
    coverPath: filePath, ...timestamps,
  }, ["id", "title", "artistId", "coverPath", "createdAt", "updatedAt"]),
  tracks: schema({
    id: catalogId,
    title: text,
    artistId: catalogId,
    albumId: catalogId,
    trackNumber: catalogId,
    genre: { bsonType: "array", items: text },
    duration: { bsonType: ["int", "long", "double"], minimum: 0, maximum: Number.MAX_SAFE_INTEGER },
    audioPath: filePath,
    coverPath: filePath,
    mimeType: text,
    sizeBytes: { ...catalogId, minimum: 0 },
    ...timestamps,
  }, ["id", "title", "artistId", "genre", "duration", "audioPath", "coverPath", "mimeType", "sizeBytes", "createdAt", "updatedAt"]),
  favourites: schema({
    userId: { bsonType: "objectId" },
    kind: { enum: ["track", "album", "artist"] },
    targetId: catalogId,
    createdAt: { bsonType: "date" },
  }, ["userId", "kind", "targetId", "createdAt"]),
  sessions: schema({
    _id: text,
    session: {
      bsonType: "object",
      required: ["userId"],
      properties: { userId: { bsonType: "string", pattern: "^[a-fA-F0-9]{24}$" } },
    },
    expires: { bsonType: "date" },
    lastModified: { bsonType: "date" },
  }, ["session", "expires"]),
};

export const indexes: Record<Exclude<keyof typeof validators, "sessions">, IndexDescription[]> = {
  users: [{ key: { email: 1 }, unique: true }],
  artists: [{ key: { id: 1 }, unique: true }],
  albums: [{ key: { id: 1 }, unique: true }, { key: { artistId: 1 } }],
  tracks: [
    { key: { id: 1 }, unique: true },
    { key: { albumId: 1, trackNumber: 1, id: 1 } },
    { key: { artistId: 1 } },
  ],
  favourites: [
    { key: { userId: 1, kind: 1, targetId: 1 }, unique: true },
    { key: { userId: 1, kind: 1, createdAt: -1, _id: -1 } },
  ],
};
