## Tech Stack
Do not change the existing tech stack by removing the libraries or downloading new ones from npm, unless the libraries are not related to Backend.
- Express 5
- MongoDB native driver
- argon2
- express-session, connect-mongo
- Zod
- cors, helmet, express-rate-limit
- music-metadata

Use Node.js 24 and pin backend dependency versions during implementation. Argon2id is supported by node-argon2; file metadata extraction is supported by music-metadata.

## Project Structure

The folder structure should not be changed and is served as the reference guide for future implementation decisions. 

server/
  src/
    app.ts                    # Express assembly; independently testable
    index.ts                  # Database connection, listen, shutdown
    config/                   # Validated environment configuration
    db/                       # Connection, indexes, document types
    middleware/               # Sessions, authorization, validation, errors
    modules/
      auth/                   # Routes, controllers, services, repositories
      collections/
      media/
    scripts/                  # Catalog import and development seeding
  tests/
  storage/                    # Ignored local audio and artwork

Controllers handle HTTP, services implement behavior, repositories query MongoDB, and serializes produce the existing frontend reponse shapes. 

## MongoDb database

Use one database named *streaming*. Keep media bytes on disk and store references in MongoDB.

## Validation and Acceptance

Use Node’s test runner with a dedicated test database and temporary media fixtures.

- Verify every route’s exact field names, numeric IDs, `"fullfilled"` spelling, empty responses, and ordering.
- Test registration, concurrent duplicate emails, password hashing, invalid credentials, session restoration, expiry, logout, and cross-user access rejection.
- Test favourite counts against returned IDs and album ordering.
- Test MP3 GET/HEAD, byte-range seeking, 416 responses, missing files, invalid IDs, and traversal attempts.
- Test repeatable imports, broken references, invalid audio, and missing artwork.
- After implementation, run backend checks plus the required frontend lint and build; report baseline failures separately.
- Smoke-test signup/login/logout, library loading, covers, playback, seeking, and track transitions in the browser.

Defaults: one backend instance, local persistent storage, public catalog media, session-protected personal collections, and no upload or library-write APIs. Audio assets must be supplied separately.

