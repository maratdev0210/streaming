import { api } from "../../../../shared/api/api";
import type { IAlbum, IArtist } from "../model/model";
import type { ITrackAdditionalInfo } from "../../../../entities/track/model/model";
import { BASE_URL } from "../../../../shared/config/config";
import type { ITrack } from "../../../../entities/track/model/model";

type IAlbumResponse = {
  albums: IAlbum[];
};

type IArtistResponse = {
  artists: IArtist[];
};

type IFavouriteSongsDataResponse = {
  songs: number;
};

type IFavouriteSongsByIdResponse = {
  songIds: number[];
};

type IAlbumSongsByIdResponse = IFavouriteSongsByIdResponse;

type ITrackResponse = ITrack;

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

async function loadFavouriteSongsById(): Promise<IFavouriteSongsByIdResponse> {
  const userId = localStorage.getItem("userId");

  return await api<IFavouriteSongsByIdResponse, typeof userId>(
    `/collections/favouriteSongsById?userId=${userId}`,
    "GET",
    userId
  );
}

async function loadTrackData(song_id: number): Promise<ITrackResponse> {
  return await api<ITrackResponse, number>(
    `/media/${song_id}/info.json`,
    "GET"
  );
}

async function loadAlbumSongsId(
  albumId: number
): Promise<IAlbumSongsByIdResponse> {
  console.log(albumId);
  return await api<IAlbumSongsByIdResponse, typeof albumId>(
    `/collections/albumSongs?albumId=${albumId}`,
    "GET",
    albumId
  );
}

async function loadTracksList(
  songIds: number[]
): Promise<ITrackAdditionalInfo[]> {
  const result = await Promise.all(
    songIds.map(async (song_id) => {
      const trackData = await loadTrackData(song_id);
      return {
        id: song_id,
        isRepeated: false,
        isShuffled: false,
        isPlaying: false,
        listeningTime: 0,
        volume: 50,
        src: `${BASE_URL}/media/${song_id}/${song_id}.mp3`,
        cover: `${BASE_URL}/media/${song_id}/${song_id}.webp`,
        title: trackData.title,
        artist: trackData.artist,
        genre: trackData.genre,
        duration: trackData.duration,
      };
    })
  );

  return result;
}

export {
  loadFavouriteAlbums,
  loadFavouriteArtists,
  loadFavouriteSongsData,
  loadFavouriteSongsById,
  loadTracksList,
  loadAlbumSongsId,
};
