import { useDispatch, useSelector } from "react-redux";
import {
  selectTrack,
  streamNewTrack,
} from "../../../../entities/track/model/trackSlice";
import { loadPreviousTrack } from "../api/loadPreviousTrack";

export function PlayPrevious() {
  const dispatch = useDispatch();
  const { id, isPlaying, isShuffled, isRepeated, volume } =
    useSelector(selectTrack);

  const controlPreviousTrack = async (trackId: number) => {
    const data = await loadPreviousTrack(
      trackId,
      volume,
      isShuffled,
      isPlaying,
      isRepeated
    );

    dispatch(streamNewTrack(data));
  };

  return (
    <button
      aria-label="Back"
      onClick={() => controlPreviousTrack(id)}
      className="bg-transparent border-0 rounded-full cursor-pointer p-2"
    >
      <span>
        <svg className="icon-base">
          <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7z"></path>
        </svg>
      </span>
    </button>
  );
}
