import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ITrackAdditionalInfo } from "./model";
import { BASE_URL } from "../../../shared/config/config";
import type { RootState } from "../../../app/store/store";

const initialState: ITrackAdditionalInfo = {
  title: "Lighthouse",
  artist: "Zambolino",
  genre: ["organic", "folk"],
  cover: `${BASE_URL}/media/1/1.webp`,
  duration: 103,
  isShuffled: false,
  isPlaying: false,
  isRepeated: false,
  listeningTime: 0,
  volume: 50,
  src: `${BASE_URL}/media/1/1.mp3`,
  id: 1,
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    streamNewTrack: (state, action: PayloadAction<ITrackAdditionalInfo>) => {
      return action.payload;
    },
    controlTrack: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setListeningTime: (state, action: PayloadAction<number>) => {
      state.listeningTime = action.payload;
    },
    controlShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
    },
    controlRepeat: (state) => {
      state.isRepeated = !state.isRepeated;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
  },
});

export const {
  streamNewTrack,
  controlTrack,
  setListeningTime,
  controlShuffle,
  controlRepeat,
  setVolume,
} = trackSlice.actions;
export const selectTrack = (state: RootState) => state.track;
export const selectTrackIsPlaying = (state: RootState) => state.track.isPlaying;
export const selectListeningTime = (state: RootState) =>
  state.track.listeningTime;
export const selectTrackIsShuffled = (state: RootState) =>
  state.track.isShuffled;
export const selectTrackIsRepeated = (state: RootState) =>
  state.track.isRepeated;
export const selectVolume = (state: RootState) => state.track.volume;

export default trackSlice.reducer;
