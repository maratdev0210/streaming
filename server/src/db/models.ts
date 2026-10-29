import type { ObjectId } from "mongodb";

export interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends Timestamps {
  _id: ObjectId;
  email: string;
  name: string;
  passwordHash: string;
}

export interface ArtistDocument extends Timestamps {
  _id: ObjectId;
  id: number;
  name: string;
  coverPath: string;
}

export interface AlbumDocument extends Timestamps {
  _id: ObjectId;
  id: number;
  title: string;
  artistId: number;
  coverPath: string;
}

export interface TrackDocument extends Timestamps {
  _id: ObjectId;
  id: number;
  title: string;
  artistId: number;
  albumId?: number;
  trackNumber?: number;
  genre: string[];
  duration: number;
  audioPath: string;
  coverPath: string;
  mimeType: string;
  sizeBytes: number;
}

export type FavouriteKind = "track" | "album" | "artist";

export interface FavouriteDocument {
  _id: ObjectId;
  userId: ObjectId;
  kind: FavouriteKind;
  targetId: number;
  createdAt: Date;
}

export interface SessionDocument {
  _id: string;
  session: { userId: string; [key: string]: unknown };
  expires: Date;
  lastModified?: Date;
}
