import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../../app/store/store";
import type { IMediaView, IAlbum, IArtist } from "./model";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IMediaView = {
  albums: [],
  artists: [],
};

export const mediaViewSlice = createSlice({
  name: "mediaView",
  initialState,
  reducers: {
    setFavouriteAlbums: (state, action: PayloadAction<IAlbum[]>) => {
      state.albums = action.payload;
    },
    setFavouriteArtists: (state, action: PayloadAction<IArtist[]>) => {
      state.artists = action.payload;
    },
  },
});

export const { setFavouriteAlbums, setFavouriteArtists } =
  mediaViewSlice.actions;
export const selectFavouriteAlbums = (state: RootState) =>
  state.mediaView.albums;
export const selectFavouriteArtists = (state: RootState) =>
  state.mediaView.artists;

export default mediaViewSlice.reducer;
