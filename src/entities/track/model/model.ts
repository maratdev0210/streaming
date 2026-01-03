export interface ITrack {
  title: string;
  artist: string;
  genre: string[];
  cover: string;
  duration: number;
  id: number;
}

export interface ITrackAdditionalInfo extends ITrack {
  isRepeated: boolean;
  isShuffled: boolean;
  isPlaying: boolean;
  listeningTime: number;
  volume: number;
  src: string;
}
