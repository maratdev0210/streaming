import { useDispatch, useSelector } from "react-redux";
import {
  selectTrack,
  streamNewTrack,
} from "../../../../entities/track/model/trackSlice";
import { loadNextTrack } from "../api/loadNextTrack";

export function PlayNext() {
  const dispatch = useDispatch();
  const { id, isPlaying, isShuffled, isRepeated, volume } =
    useSelector(selectTrack);

  const controlNextTrack = async (trackId: number) => {
    const data = await loadNextTrack(
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
      aria-label="Next"
      onClick={() => controlNextTrack(id)}
      className="bg-transparent border-0 rounded-full cursor-pointer p-2"
    >
      <span>
        <svg className="icon-base">
          <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7z"></path>
        </svg>
      </span>
    </button>
  );
}
