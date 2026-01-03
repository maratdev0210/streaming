import { selectTrack } from "../../../entities/track/model/trackSlice";
import {
  Playback,
  RepeatTrack,
  ShuffleTrack,
  StreamTrack,
  PlayNext,
  PlayPrevious,
  Lyrics,
  Queue,
  ConnectDevice,
  Volume,
  MiniPlayer,
  FullScreen,
  AudioPlayer,
} from "../../../features/Track";
import { useSelector } from "react-redux";

export function Track() {
  const { title, artist, cover, duration } = useSelector(selectTrack);


  return (
    <div className="flex h-24 p-2 justify-between items-center bg-black fixed bottom-0 w-full">
      <AudioPlayer />
      <div className="w-72 flex-1">
        <div className="flex items-center gap-4 *:cursor-pointer">
          <div>
            <img className="size-14 rounded-xl" src={cover} />
          </div>
          <div className="*:hover:underline">
            <p className="text-sm text-white">{title}</p>
            <p className="text-xs text-subdued">{artist}</p>
          </div>
        </div>
      </div>
      <div className="w-140 flex-1">
        <div className="flex justify-center relative bottom-2">
          <div className="flex justify-center">
            <div className="flex justify-between items-center w-full gap-4">
              <div className="flex gap-2">
                <ShuffleTrack />
                <PlayPrevious />
              </div>
              <div>
                <StreamTrack />
              </div>
              <div className="flex gap-2">
                <PlayNext />
                <RepeatTrack />
              </div>
            </div>
          </div>
        </div>
        <Playback duration={duration} />
      </div>
      <div className="flex flex-1 justify-end h-8">
        <div className="flex items-center">
          <Lyrics />
          <Queue />
          <ConnectDevice />
          <Volume />
          <MiniPlayer />
          <FullScreen />
        </div>
      </div>
    </div>
  );
}
