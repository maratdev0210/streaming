import type { ICollection, Playlist, Album, Artist } from "./model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/store";

const initialState: ICollection = {
  albums: [],
  artists: [],
  playlists: [],
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists = [
        ...state.playlists,
        {
          title: action.payload.title,
          songs: action.payload.songs,
          author: action.payload.author,
          tracks: action.payload.tracks,
        },
      ];
    },
    setAlbum: (state, action: PayloadAction<Album>) => {
      state.albums = [
        ...state.albums,
        {
          title: action.payload.title,
          songs: action.payload.songs,
          coverUrl: action.payload.coverUrl,
          artist: action.payload.artist,
          tracks: action.payload.tracks,
        },
      ];
    },
    setArtist: (state, action: PayloadAction<Artist>) => {
      state.artists = [
        ...state.artists,
        {
          artist: action.payload.artist,
        },
      ];
    },
  },
});

export const { setPlaylist, setAlbum, setArtist } = collectionSlice.actions;
export const selectPlaylist = (state: RootState, playlistTitle: string) =>
  state.collection.playlists.filter(
    (playlist: Playlist) => playlist.title === playlistTitle
  );

export const selectAlbum = (state: RootState, albumTitle: string) =>
  state.collection.albums.filter((album: Album) => album.title === albumTitle);

export default collectionSlice.reducer;
