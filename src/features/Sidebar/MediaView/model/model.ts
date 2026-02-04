export interface IAlbum {
  title: string;
  artist: string;
  cover_url: string;
  id: number;
}

export interface IArtist {
  artist: string;
  cover_url: string;
}

export interface IMediaView {
  albums: IAlbum[];
  artists: IArtist[];
}
