import { useRef } from "react";
import type { PointerEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setListeningTime } from "../../../../entities/track/model/trackSlice";
import { selectListeningTime } from "../../../../entities/track/model/trackSlice";
import type { ITrackAdditionalInfo } from "../../../../entities/track/model/model";
import type { ITrack } from "../../../../entities/track/model/model";

type IFormatTime = Pick<ITrackAdditionalInfo, "listeningTime" | "duration">;
type ISliderProps = Pick<ITrack, "duration">;

function formatPercentage({ listeningTime, duration }: IFormatTime): number {
  return Math.round((listeningTime / duration) * 100);
}

function calculateListeningTime(pct: number, duration: number): number {
  return Math.floor((pct * duration) / 100);
}

export function Slider({ duration }: ISliderProps) {
  const dispatch = useDispatch();
  const listeningTime = useSelector(selectListeningTime);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  function onPointerDown(e: PointerEvent) {
    const slider = sliderRef.current;
    const thumb = thumbRef.current;

    if (!slider || !thumb) return;

    const { left, right, width } = slider.getBoundingClientRect();

    slider.setPointerCapture(e.pointerId);

    slider.onpointermove = function (e: globalThis.PointerEvent) {
      if (!slider || !thumb || !slider.firstElementChild) return;
      const clamped = Math.min(right, Math.max(left, e.clientX));
      const pct = Math.round(((clamped - left) / width) * 100);

      const newListeningTime = calculateListeningTime(pct, duration);
      dispatch(setListeningTime(newListeningTime));
      const sliderChild = slider.firstElementChild as HTMLElement;
      thumb.style.left = `${pct}%`;
      sliderChild.style.width = `${pct}%`;
    };

    slider.onpointerup = function (e: globalThis.PointerEvent) {
      slider.releasePointerCapture(e.pointerId);
      slider.onpointermove = null;
      slider.onpointerup = null;
    };
  }

  return (
    <div className="h-full w-full cursor-pointer">
      <div
        ref={sliderRef}
        className="group rounded-xs h-1 flex absolute w-full top-[50%] -translate-y-1/2 bg-[#ffffff4d]"
      >
        <div
          className="peer w-0 bg-white group-hover:bg-is-active-fg-color rounded-xs"
          style={{ width: `${formatPercentage({ listeningTime, duration })}%` }}
        >
          <div className="rounded-xs h-1 w-full will-change-transform  bg-white -translate-x-[33%] invisible"></div>
        </div>
        <div
          onPointerDown={onPointerDown}
          ref={thumbRef}
          className="progress-bar left-0"
          style={{ left: `${formatPercentage({ listeningTime, duration })}%` }}
        ></div>
      </div>
    </div>
  );
}
