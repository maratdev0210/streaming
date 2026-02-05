import {
  PlayMedia,
  ShuffleMedia,
  DownloadMedia,
  MediaView
} from "../../../features/MediaControl";

export function MediaControl() {
  return (
    <div className="h-23 box-border mediaControlBackground flex relative items-start p-5 flex-col w-full">
      <div className="flex w-full flex-row items-center">
        <PlayMedia />
        <ShuffleMedia />
        <DownloadMedia />
        <MediaView />
      </div>
    </div>
  );
}
