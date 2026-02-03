import { api } from "../../../../shared/api/api";
import type { IAlbum, IArtist } from "../model/model";

type IAlbumResponse = {
  albums: IAlbum[];
};

type IArtistResponse = {
  artists: IArtist[];
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

export { loadFavouriteAlbums, loadFavouriteArtists };
