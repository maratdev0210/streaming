import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../../app/store/store";
import type { IMediaView, IAlbum } from "./model";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IMediaView = {
  albums: [],
};

export const mediaViewSlice = createSlice({
  name: "mediaView",
  initialState,
  reducers: {
    setFavouriteAlbums: (state, action: PayloadAction<IAlbum[]>) => {
      state.albums = action.payload;
    },
  },
});

export const { setFavouriteAlbums } = mediaViewSlice.actions;
export const selectFavouriteAlbums = (state: RootState) =>
  state.mediaView.albums;

export default mediaViewSlice.reducer;
