# Streaming database

Requires Node.js 24+ and a running MongoDB instance. From `server/`:

```sh
cp .env.example .env
# Set MONGODB_URI in .env when using a remote or authenticated instance.
npm run db:setup
```

The application database name is always `streaming`, even when the URI names
another default database. Setup creates `users`, `artists`, `albums`, `tracks`,
`favourites`, and `sessions`, with strict validators and the requested indexes.
It prints document counts, inserts no records, and never clears existing data.
Reruns update validators and ensure indexes; conflicting existing indexes or
duplicate data fail setup rather than being silently deleted.

`database.ts` exports `connectDatabase()` for future server startup. Its result
provides `db`, typed `collections`, a ready `sessionStore`, and `close()`.
Call `close()` during application shutdown. The returned store shares the client;
do not close it independently while other database operations are running.

All dates are BSON dates. New writes must supply `createdAt` and `updatedAt`
where defined; updates must advance `updatedAt`. MongoDB does not set these
automatically. Normalize email to lowercase and trim it before writing; the
validator rejects uppercase or whitespace. Unique indexes enforce uniqueness.

Media files belong under `server/storage/`; database fields contain relative
paths such as `media/1/1.mp3`, never file bytes. Schema validators reject unknown
fields, absolute paths, traversal, and URL/data references. File-reading code
must also contain resolved paths within the storage root, including symlinks.
Do not persist volume, playback time, repeat, shuffle, or playing status.

`queries.ts` exposes safe user serialization, artist-resolving track/album
serializers, and shared favourite-track count/ID queries. Counts and lists use
the same filter; separate requests can still differ if favourites change between
requests. Importers must call `validateCatalogReferences()` before publishing a
batch and avoid deleting referenced catalog records. MongoDB does not enforce
foreign keys. This helper validates references only; file inspection and import
writes belong to the future import command.

`connect-mongo` owns session persistence and its `expires` TTL index. The store
uses `stringify: false`, so `session` is a BSON object containing a hexadecimal
string `userId`. Configure future Express session middleware with
`saveUninitialized: false`, and assign `userId` before saving an authenticated
session; anonymous persisted sessions are intentionally rejected. The store
checks expiry on reads; TTL cleanup is asynchronous. No sessions are created by
database setup.

Validation:

```sh
npm run typecheck
npm test
MONGODB_TEST_URI=mongodb://127.0.0.1:27017 npm test
```

Integration tests use a random `streaming_test_*` database and drop only that
database afterward. The supplied test connection needs database creation and
deletion permissions. Tests never seed or delete the `streaming` database.
