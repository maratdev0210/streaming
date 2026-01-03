import { useDispatch, useSelector } from "react-redux";
import {
  controlTrack,
  selectTrackIsPlaying,
} from "../../../entities/track/model/trackSlice";

export function StreamTrack() {
  const dispatch = useDispatch();
  const isTrackPlaying = useSelector(selectTrackIsPlaying);
  
  return (
    <div>
      <button
        onClick={() => dispatch(controlTrack())}
        aria-label="Listen"
        className="rounded-full p-2 size-8 flex items-center justify-center bg-white cursor-pointer hover:scale-104 transition duration-75"
      >
        <span className="inline-block">
          <span>
            <svg className={isTrackPlaying ? "pause-icon" : "play-icon"}>
              {isTrackPlaying ? (
                <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
              ) : (
                <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"></path>
              )}
            </svg>
          </span>
        </span>
      </button>
    </div>
  );
}
