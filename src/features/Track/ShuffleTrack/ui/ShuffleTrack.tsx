import { useSelector, useDispatch } from "react-redux";
import {
  selectTrackIsShuffled,
  controlShuffle,
} from "../../../../entities/track/model/trackSlice";

export function ShuffleTrack() {
  const isTrackShuffled = useSelector(selectTrackIsShuffled);
  const dispatch = useDispatch();
  return (
    <button
      aria-label="Shuffle"
      className="bg-transparent border-0 rounded-full cursor-pointer p-2"
    >
      <span className="relative">
        <svg
          onClick={() => dispatch(controlShuffle())}
          className={`${isTrackShuffled ? "icon-base_active" : "icon-base"} size-4 hover:scale-104 transition duration-75`}
        >
          <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"></path>
          <path d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z"></path>
        </svg>
        <span
          className={isTrackShuffled ? "icon-base_active_mark" : ""}
        ></span>
      </span>
    </button>
  );
}
