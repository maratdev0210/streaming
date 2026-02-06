import { selectMediaViewType } from "../../model/mediaControlSlice";
import { useSelector } from "react-redux";
import type { ITrack } from "../../../../entities/track/model/model";
import { useState } from "react";

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

function DurationIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      fill="#b3b3b3"
      viewBox="0 0 16 16"
      width="16"
      height="16"
    >
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"></path>
      <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25"></path>
    </svg>
  );
}

function PlayMediaIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      width="24"
      height="24"
      fill="#fff"
      viewBox="0 0 24 24"
    >
      <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
    </svg>
  );
}

function MediaListRow({ mediaViewType }: { mediaViewType: "List" | "Dense" }) {
  return (
    <div className="top-16 pl-5 pr-5 bg-gradient-start-media sticky h-9 z-2 mb-3 border-b border-b-[#0000]">
      <div>
        <div className="h-9 gap-4 flex items-center justify-start border-b border-b-[#ffffff1a] text-subdued">
          <div className="flex items-center justify-self-end">
            <div>#</div>
          </div>
          <div className="flex items-center">
            <div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-subdued">Title</span>
              </div>
            </div>
            <div className="ml-50 h-2 w-1"></div>
          </div>
          <div className="flex items-cente relative">
            <div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-subdued">
                  {mediaViewType === "List" ? "Album" : "Artist"}
                </span>
              </div>
            </div>
            <div className="ml-50 h-2 w-1"></div>
          </div>
          <div className="flex items-cente relative">
            <div>
              <div className="flex w-20 items-center justify-center">
                <span className="text-sm text-subdued">
                  {mediaViewType === "List" ? "Liked at" : "Album"}
                </span>
              </div>
            </div>
            <div className="ml-50 h-2 w-1"></div>
          </div>
          <div className="flex w-30 justify-end items-center relative right-6">
            <div>
              <div className="flex justify-center items-center">
                <DurationIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type IMediaItemProps = Omit<ITrack, "genre"> & {
  order: number;
  isTrackSelected: boolean;
  src: string;
};

function MediaItem({
  title,
  artist,
  cover,
  duration,
  id,
  order,
  genre,
  isTrackSelected,
}: IMediaItemProps) {
  const [isTrackHovered, setIsTrackHovered] = useState(false);
  const mediaViewType = useSelector(selectMediaViewType);
  return (
    <div
      onMouseLeave={() => setIsTrackHovered(false)}
      onMouseEnter={() => setIsTrackHovered(true)}
      className={`${isTrackHovered ? "bg-[#282828]" : ""} ${order === 1 ? "bg-graident-first-track" : "bg-bacgkround-base "} h-14 relative flex gap-4 pl-4 pr-4`}
    >
      <div className="flex justify-self-end items-center">
        <div
          className={`${isTrackSelected ? "text-positive" : "text-subdued"} w-4 h-4 relative`}
        >
          <span className={`${isTrackHovered ? "hidden" : ""} absolute -top-1`}>
            {order}
          </span>
          {isTrackHovered && (
            <button className="flex absolute justify-center items-center text-white w-full h-full">
              <PlayMediaIcon />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <img
          src={cover}
          className={`${mediaViewType === "Dense" ? "hidden" : ""} mr-3 size-10 rounded-sm`}
        />
        <div
          className={mediaViewType === "Dense" ? "flex items-center gap-1" : ""}
        >
          <div>
            <span
              className={`${isTrackSelected ? "text-positive" : "text-white"} hover:underline`}
            >
              {title}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className={`${mediaViewType === "Dense" ? "relative top-0.5" : ""} bg-subdued size-4 text-black flex justify-center items-center rounded-xs font-bold text-xs`}
            >
              E
            </span>
            <span
              className={`${mediaViewType === "Dense" ? "hidden" : ""} text-subdued text-sm`}
            >
              {artist}
            </span>
          </div>
        </div>
        <div
          className={`${mediaViewType === "Dense" ? "ml-38" : "ml-22"}  h-2 w-1`}
        ></div>
      </div>
      <div className="flex items-center">
        <span
          className={`text-sm ${isTrackHovered ? "text-white" : "text-subdued"}`}
        >
          {mediaViewType === "Dense" ? artist : "Album"}
        </span>
      </div>
      <div className="flex items-center">
        <div
          className={`${mediaViewType === "Dense" ? "ml-46" : "ml-52"}  h-2 w-1`}
        ></div>
        <span className="text-subdued text-sm">
          {mediaViewType === "Dense" ? "Album" : "2 days ago"}
        </span>
      </div>
      <div className="flex items-center">
        <div className="ml-43 h-2 w-1"></div>
        <span className="text-subdued text-sm">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export function MediaList() {
  const mediaViewType = useSelector(selectMediaViewType);

  return (
    <div className="w-full">
      <div className="relative">
        <div style={{ height: "4500px" }} className="relative">
          <MediaListRow mediaViewType={mediaViewType} />

          <div>
            <MediaItem
              id={3}
              title="Surfing"
              artist="Zambolino"
              cover="http://localhost:3000/media/3/3.webp"
              duration={61}
              order={1}
              src="http://localhost:3000/media/3/3.mp3"
              isTrackSelected={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
