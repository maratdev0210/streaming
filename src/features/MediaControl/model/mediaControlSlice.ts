import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IMediaControl } from "./model";
import type { RootState } from "../../../app/store/store";

const initialState: IMediaControl = {
  isShuffled: false,
  mediaViewType: "List",
  currentlyPlayedTrackId: null,
};

export const mediaControlSlice = createSlice({
  name: "mediaControl",
  initialState,
  reducers: {
    setShuffleMedia: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    setMediaViewType: (state, action: PayloadAction<"List" | "Dense">) => {
      state.mediaViewType = action.payload;
    },
    setCurrentlyPlayedTrackId: (state, action: PayloadAction<number>) => {
      state.currentlyPlayedTrackId = action.payload;
    },
  },
});

export const { setShuffleMedia, setMediaViewType } = mediaControlSlice.actions;
export const selectMediaViewType = (state: RootState) =>
  state.mediaControl.mediaViewType;
export const selectMediaShuffled = (state: RootState) =>
  state.mediaControl.isShuffled;
export const selectCurrentlyPlayedTrackId = (state: RootState) =>
  state.mediaControl.currentlyPlayedTrackId;

export default mediaControlSlice.reducer;
