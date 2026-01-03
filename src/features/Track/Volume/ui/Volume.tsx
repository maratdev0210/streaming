import { useSelector, useDispatch } from "react-redux";
import {
  selectVolume,
  setVolume,
} from "../../../../entities/track/model/trackSlice";
import { VolumeIcon } from "../../../../shared/ui/VolumeIcon.ui";
import { useRef } from "react";
import type { PointerEvent } from "react";

export function Volume() {
  const dispatch = useDispatch();
  const volume = useSelector(selectVolume);
  const volumeRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  function onPointerDown(e: PointerEvent) {
    const volume = volumeRef.current;
    const thumb = thumbRef.current;

    if (!volume || !thumb) return;

    const { left, right, width } = volume.getBoundingClientRect();

    volume.setPointerCapture(e.pointerId);

    volume.onpointermove = function (e: globalThis.PointerEvent) {
      if (!volume || !thumb || !volume.firstElementChild) return;
      const clamped = Math.min(right, Math.max(left, e.clientX));
      const newVolume = Math.round(((clamped - left) / width) * 100);

      dispatch(setVolume(newVolume));
      const volumeChild = volume.firstElementChild as HTMLElement;
      thumb.style.left = `${newVolume}%`;
      volumeChild.style.width = `${newVolume}%`;
    };

    volume.onpointerup = function (e: globalThis.PointerEvent) {
      volume.releasePointerCapture(e.pointerId);
      volume.onpointermove = null;
      volume.onpointerup = null;
    };
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => dispatch(setVolume(0))}
        className="bg-transparent border-0 border-full cursor-pointer p-2"
      >
        <VolumeIcon volume={volume} />
      </button>
      <div className="h-3 w-32 relative">
        <label className="hidden-visually">
          Change Track volume
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            aria-valuetext="50 out of 100"
            value="50"
          />
        </label>
        <div className="h-full w-full cursor-pointer">
          <div
            ref={volumeRef}
            className="group rounded-xs h-1 flex absolute w-full top-[50%] -translate-y-1/2 bg-[#ffffff4d]"
          >
            <div
              className="peer w-0 bg-white group-hover:bg-is-active-fg-color rounded-xs"
              style={{ width: `${volume}%` }}
            >
              <div className="rounded-xs h-1 w-full will-change-transform bg-white -translate-x-[33%] invisible"></div>
            </div>
            <div
              onPointerDown={onPointerDown}
              ref={thumbRef}
              className="progress-bar left-0"
              style={{ left: `${volume}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
