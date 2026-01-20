export interface IAlbum {
    title: string;
    artist: string;
    cover_url: string;
}

export interface IMediaView {
    albums: IAlbum[];
}