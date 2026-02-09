interface ITrack {
  title: string;
  artist: string;
  genre: string[];
  cover: string;
  duration: number;
  id: number;
}

export interface TrackAdditionalInfo extends ITrack {
  isRepeated: boolean;
  isShuffled: boolean;
  isPlaying: boolean;
  listeningTime: number;
  volume: number;
  src: string;
}

export interface Playlist {
  title: string;
  songs: number;
  author: string;
  tracks: TrackAdditionalInfo[];
}

export interface Artist {
  artist: string;
}

export interface Album {
  title: string;
  coverUrl: string;
  artist: string;
  songs: number;
  tracks: TrackAdditionalInfo[];
}

export interface ICollection {
  playlists: Playlist[];
  artists: Artist[];
  albums: Album[];
}
