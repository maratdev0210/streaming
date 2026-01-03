import { Slider } from "./Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  selectListeningTime,
  selectTrackIsPlaying,
  setListeningTime,
} from "../../../../entities/track/model/trackSlice";
import type { ITrack } from "../../../../entities/track/model/model";
import { useEffect } from "react";

type IPlayback = Pick<ITrack, "duration">;

function formatTime(time: number): string {
  if (time == 0) {
    return "0:00";
  }
  if (time < 10) {
    return `0:0${time}`;
  }
  if (time < 60) {
    return `0:${time}`;
  }
  if (time % 60 < 10) {
    return `${Math.floor(time / 60)}:0${time % 60}`;
  }
  return `${Math.floor(time / 60)}:${time % 60}`;
}

export function Playback({ duration }: IPlayback) {
  const dispatch = useDispatch();
  const listeningTime = useSelector(selectListeningTime);
  const isTrackPlaying = useSelector(selectTrackIsPlaying);

  useEffect(() => {
    if (!isTrackPlaying) return;

    const id = setInterval(() => {
      const newTime = listeningTime + 1;
      dispatch(setListeningTime(newTime));
    }, 1000);

    return () => clearInterval(id);
  }, [isTrackPlaying, dispatch, listeningTime]);

  return (
    <div className="flex w-140 justify-between items-center gap-2">
      <div className="text-subdued text-xs text-right flex-1">
        {formatTime(listeningTime)}
      </div>
      <div className="h-3 w-full relative">
        <label className="hidden-visually">
          Change track position
          <input
            type="range"
            min="0"
            max="308617"
            step="5000"
            aria-valuetext="0:43 out of 3:17"
            value="43000"
          />
        </label>
        <Slider duration={duration} />
      </div>
      <div className="text-subdued text-xs text-right flex-1">
        {formatTime(duration)}
      </div>
    </div>
  );
}
