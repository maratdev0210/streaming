import { api } from "../../../../shared/api/api";
import type { IAlbum } from "../model/model";

type IAlbumResponse = {
  albums: IAlbum[];
};

async function loadFavouriteAlbums(): Promise<IAlbumResponse> {
  const userId = localStorage.getItem("userId");

  return await api<IAlbumResponse, typeof userId>(
    `/collections/favouriteAlbums?userId=${userId}`,
    "GET",
    userId
  );
}

export { loadFavouriteAlbums };
