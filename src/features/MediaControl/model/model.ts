export interface IMediaControl {
  isShuffled: boolean;
  mediaViewType: "List" | "Dense";
  currentlyPlayedTrackId: number | null;
}
