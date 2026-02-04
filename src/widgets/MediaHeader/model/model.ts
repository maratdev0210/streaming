export interface MediaHeaderProps {
    mediaType: "Playlist" | "Album";
    author: string;
    title: string;
    coverUrl: string;
    songs: number; 
}