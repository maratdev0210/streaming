import { api } from "../../../../shared/api/api";
import type { IAlbum, IArtist } from "../model/model";

type IAlbumResponse = {
  albums: IAlbum[];
};

type IArtistResponse = {
  artists: IArtist[];
};

type IFavouriteSongsDataResponse = {
  songs: number;
};

async function loadFavouriteAlbums(): Promise<IAlbumResponse> {
  const userId = localStorage.getItem("userId");

  return await api<IAlbumResponse, typeof userId>(
    `/collections/favouriteAlbums?userId=${userId}`,
    "GET",
    userId
  );
}

async function loadFavouriteArtists(): Promise<IArtistResponse> {
  const userId = localStorage.getItem("userId");

  return await api<IArtistResponse, typeof userId>(
    `/collections/favouriteArtists?userId=${userId}`,
    "GET",
    userId
  );
}

async function loadFavouriteSongsData(): Promise<IFavouriteSongsDataResponse> {
  const userId = localStorage.getItem("userId");

  return await api<IFavouriteSongsDataResponse, typeof userId>(
    `/collections/favouriteSongsData?userId=${userId}`,
    "GET",
    userId
  );
}

export { loadFavouriteAlbums, loadFavouriteArtists, loadFavouriteSongsData };
