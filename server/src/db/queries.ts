import type { Filter, ObjectId } from "mongodb";
import type { Collections } from "./database.ts";
import type { AlbumDocument, ArtistDocument, FavouriteDocument, TrackDocument, UserDocument } from "./models.ts";

export function serializeUser(user: UserDocument) {
  return { userId: user._id.toHexString(), email: user.email, name: user.name };
}

async function artistName(collections: Collections, artistId: number) {
  const artist = await collections.artists.findOne({ id: artistId });
  if (!artist) throw new Error(`Artist ${artistId} does not exist.`);
  return artist.name;
}

export async function serializeTrack(collections: Collections, track: TrackDocument) {
  return {
    id: track.id,
    title: track.title,
    artist: await artistName(collections, track.artistId),
    genre: track.genre,
    duration: track.duration,
    cover: `${track.id}.webp`,
  };
}

export async function serializeAlbum(collections: Collections, album: AlbumDocument, publicBaseUrl: string) {
  return {
    id: album.id,
    title: album.title,
    artist: await artistName(collections, album.artistId),
    cover_url: new URL(`/artwork/albums/${album.id}.webp`, publicBaseUrl).href,
  };
}

export function favouriteTrackFilter(userId: ObjectId): Filter<FavouriteDocument> {
  return { userId, kind: "track" };
}

export async function countFavouriteTracks(collections: Collections, userId: ObjectId) {
  return collections.favourites.countDocuments(favouriteTrackFilter(userId));
}

export async function listFavouriteTrackIds(collections: Collections, userId: ObjectId) {
  const favourites = await collections.favourites.find(favouriteTrackFilter(userId))
    .sort({ createdAt: -1, _id: -1 }).project<{ targetId: number }>({ _id: 0, targetId: 1 }).toArray();
  return favourites.map(({ targetId }) => targetId);
}

/** Call before publishing an imported batch; references may be in the batch or DB. */
export async function validateCatalogReferences(collections: Collections, batch: {
  artists: Pick<ArtistDocument, "id">[];
  albums: Pick<AlbumDocument, "id" | "artistId">[];
  tracks: Pick<TrackDocument, "id" | "artistId" | "albumId" | "trackNumber">[];
}) {
  const artistIds = new Set<number>();
  const albums = new Map<number, number>();
  for (const items of [batch.artists, batch.albums, batch.tracks]) {
    const ids = new Set<number>();
    for (const item of items) {
      if (!Number.isSafeInteger(item.id) || item.id <= 0 || ids.has(item.id)) {
        throw new Error("Catalog IDs must be unique positive safe integers within each collection.");
      }
      ids.add(item.id);
    }
  }
  batch.artists.forEach(({ id }) => artistIds.add(id));
  batch.albums.forEach(({ id, artistId }) => albums.set(id, artistId));

  async function requireArtist(id: number) {
    if (!Number.isSafeInteger(id) || id <= 0) throw new Error("Invalid artist reference.");
    if (!artistIds.has(id)) {
      if (!await collections.artists.findOne({ id }, { projection: { _id: 1 } })) {
        throw new Error(`Artist ${id} does not exist.`);
      }
      artistIds.add(id);
    }
  }
  for (const album of batch.albums) await requireArtist(album.artistId);
  for (const track of batch.tracks) {
    await requireArtist(track.artistId);
    if (track.trackNumber !== undefined && (!Number.isSafeInteger(track.trackNumber) || track.trackNumber <= 0)) {
      throw new Error("Track numbers must be positive safe integers.");
    }
    if (track.albumId === undefined) continue;
    if (!Number.isSafeInteger(track.albumId) || track.albumId <= 0) throw new Error("Invalid album reference.");
    if (!albums.has(track.albumId)) {
      const album = await collections.albums.findOne({ id: track.albumId });
      if (!album) throw new Error(`Album ${track.albumId} does not exist.`);
      await requireArtist(album.artistId);
      albums.set(album.id, album.artistId);
    }
  }
}
