import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { Cookie } from "express-session";
import { MongoClient, MongoServerError, ObjectId } from "mongodb";
import { initializeDatabase } from "../src/db/database.ts";
import {
  countFavouriteTracks, listFavouriteTrackIds,
  serializeAlbum, serializeTrack, serializeUser, validateCatalogReferences,
} from "../src/db/queries.ts";

test("user serialization exposes a string ID and excludes password hashes", () => {
  const _id = new ObjectId();
  assert.deepEqual(serializeUser({
    _id, email: "listener@example.com", name: "Listener", passwordHash: "private",
    createdAt: new Date(), updatedAt: new Date(),
  }), { userId: _id.toHexString(), email: "listener@example.com", name: "Listener" });
});

test("MongoDB schemas, indexes, queries, and session store", {
  skip: !process.env.MONGODB_TEST_URI && "Set MONGODB_TEST_URI to run isolated MongoDB integration tests.",
}, async (t) => {
  const client = new MongoClient(process.env.MONGODB_TEST_URI!, { serverSelectionTimeoutMS: 5000 });
  // Never drop or insert test records into the application database.
  const name = `streaming_test_${randomUUID().replaceAll("-", "")}`;
  await client.connect();
  try {
    const { db, collections: c, sessionStore } = await initializeDatabase(client, name);
    await t.test("setup is repeatable and creates exactly six empty collections", async () => {
      await initializeDatabase(client, name);
      assert.deepEqual((await db.listCollections().toArray()).map(({ name }) => name).sort(),
        ["albums", "artists", "favourites", "sessions", "tracks", "users"]);
      for (const collection of Object.values(c)) assert.equal(await collection.countDocuments(), 0);
      const ttl = (await c.sessions.listIndexes().toArray()).find(({ key }) => key.expires === 1);
      assert.equal(ttl?.expireAfterSeconds, 0);
      const trackIndexes = await c.tracks.listIndexes().toArray();
      assert.ok(trackIndexes.some(({ key, unique }) => key.id === 1 && unique));
      assert.ok(trackIndexes.some(({ key }) => JSON.stringify(key) === JSON.stringify({ albumId: 1, trackNumber: 1, id: 1 })));
      assert.ok(trackIndexes.some(({ key }) => key.artistId === 1));
      const albumIndexes = await c.albums.listIndexes().toArray();
      assert.ok(albumIndexes.some(({ key, unique }) => key.id === 1 && unique));
      assert.ok(albumIndexes.some(({ key }) => key.artistId === 1));
      assert.ok((await c.artists.listIndexes().toArray()).some(({ key, unique }) => key.id === 1 && unique));
      const favouriteIndexes = await c.favourites.listIndexes().toArray();
      assert.ok(favouriteIndexes.some(({ key, unique }) => unique && key.userId === 1 && key.kind === 1 && key.targetId === 1));
      assert.ok(favouriteIndexes.some(({ key }) => key.userId === 1 && key.kind === 1 && key.createdAt === -1 && key._id === -1));
    });

    const dates = { createdAt: new Date(), updatedAt: new Date() };
    const user = { _id: new ObjectId(), email: "listener@example.com", name: "Listener", passwordHash: "hash", ...dates };
    const artist = { _id: new ObjectId(), id: 1, name: "Artist", coverPath: "artists/1.webp", ...dates };
    const album = { _id: new ObjectId(), id: 1, title: "Album", artistId: 1, coverPath: "albums/1.webp", ...dates };
    const track = { _id: new ObjectId(), id: 1, title: "Song", artistId: 1, albumId: 1, trackNumber: 1,
      genre: ["folk"], duration: 103.5, audioPath: "media/1/1.mp3", coverPath: "media/1/1.webp",
      mimeType: "audio/mpeg", sizeBytes: 1024, ...dates };
    const code = (expected: number) => (error: unknown) => error instanceof MongoServerError && error.code === expected;

    await t.test("valid models and uniqueness constraints", async () => {
      await c.users.insertOne(user);
      await c.artists.insertOne(artist);
      await c.albums.insertOne(album);
      await c.tracks.insertOne(track);
      await assert.rejects(c.users.insertOne({ ...user, _id: new ObjectId() }), code(11000));
      await assert.rejects(c.artists.insertOne({ ...artist, _id: new ObjectId() }), code(11000));
      await assert.rejects(c.albums.insertOne({ ...album, _id: new ObjectId() }), code(11000));
      await assert.rejects(c.tracks.insertOne({ ...track, _id: new ObjectId() }), code(11000));
      const { albumId: _albumId, trackNumber: _trackNumber, ...single } = track;
      await c.tracks.insertOne({ ...single, _id: new ObjectId(), id: 2 });
    });

    await t.test("validators reject fractional IDs, missing fields, invalid references and media bytes", async () => {
      for (const id of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1]) {
        await assert.rejects(c.tracks.insertOne({ ...track, _id: new ObjectId(), id }), code(121));
      }
      for (const audioPath of ["../outside.mp3", "/outside.mp3", "data:audio/mpeg;base64,AAAA"]) {
        await assert.rejects(c.tracks.insertOne({ ...track, _id: new ObjectId(), id: 3, audioPath }), code(121));
      }
      await assert.rejects(db.collection("tracks").insertOne({ ...track, _id: new ObjectId(), id: 3, audio: Buffer.from("bytes") }), code(121));
      await assert.rejects(db.collection("users").insertOne({ email: "a@b.com" }), code(121));
      await assert.rejects(c.users.insertOne({ ...user, _id: new ObjectId(), email: "UPPER@example.com" }), code(121));
      await assert.rejects(c.favourites.insertOne({ _id: new ObjectId(), userId: user._id, kind: "track", targetId: 0, createdAt: new Date() }), code(121));
      await assert.rejects(c.sessions.insertOne({ _id: "invalid", session: { userId: "bad" }, expires: new Date() }), code(121));
    });

    await t.test("serializers resolve artist names and exclude playback state and disk paths", async () => {
      assert.deepEqual(await serializeTrack(c, track), {
        id: 1, title: "Song", artist: "Artist", genre: ["folk"], duration: 103.5, cover: "1.webp",
      });
      assert.deepEqual(await serializeAlbum(c, album, "http://localhost:3000"), {
        id: 1, title: "Album", artist: "Artist", cover_url: "http://localhost:3000/artwork/albums/1.webp",
      });
      await c.artists.updateOne({ id: 1 }, { $set: { name: "Renamed" } });
      assert.equal((await serializeTrack(c, track)).artist, "Renamed");
    });

    await t.test("favourite counts and ordered IDs share ownership and kind filters", async () => {
      const favourite = { _id: new ObjectId(), userId: user._id, kind: "track" as const, targetId: 1, createdAt: new Date(0) };
      await c.favourites.insertMany([favourite,
        { ...favourite, _id: new ObjectId(), targetId: 2, createdAt: new Date(1) },
        { ...favourite, _id: new ObjectId(), kind: "album" },
        { ...favourite, _id: new ObjectId(), userId: new ObjectId() }]);
      await assert.rejects(c.favourites.insertOne({ ...favourite, _id: new ObjectId() }), code(11000));
      assert.equal(await countFavouriteTracks(c, user._id), 2);
      assert.deepEqual(await listFavouriteTrackIds(c, user._id), [2, 1]);
      assert.equal(await countFavouriteTracks(c, new ObjectId()), 0);
    });

    await t.test("import references resolve within a batch or existing catalog", async () => {
      await validateCatalogReferences(c, { artists: [], albums: [], tracks: [track] });
      await validateCatalogReferences(c, { artists: [{ id: 5 }], albums: [{ id: 5, artistId: 5 }], tracks: [{ id: 5, artistId: 5, albumId: 5 }] });
      await assert.rejects(validateCatalogReferences(c, { artists: [], albums: [], tracks: [{ id: 5, artistId: 99 }] }), /Artist 99/);
      await assert.rejects(validateCatalogReferences(c, { artists: [], albums: [], tracks: [{ id: 5, artistId: 1, albumId: 99 }] }), /Album 99/);
      await assert.rejects(validateCatalogReferences(c, { artists: [{ id: 5 }, { id: 5 }], albums: [], tracks: [] }), /unique positive/);
      assert.equal(await c.artists.countDocuments({ id: 5 }), 0);
    });

    await t.test("connect-mongo persists string user IDs and expiry without custom session writes", async () => {
      await new Promise<void>((resolve, reject) => sessionStore.set("test-session", {
        userId: user._id.toHexString(), cookie: Object.assign(new Cookie(), { maxAge: 60000 }),
      }, (error: unknown) => error ? reject(error) : resolve()));
      const stored = await c.sessions.findOne({ _id: "test-session" });
      assert.equal(stored?.session.userId, user._id.toHexString());
      assert.ok(stored?.expires instanceof Date);
      assert.ok(stored.expires.getTime() > Date.now());
    });
  } finally {
    await client.db(name).dropDatabase();
    await client.close();
  }
});
