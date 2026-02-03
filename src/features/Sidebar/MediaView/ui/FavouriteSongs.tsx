import { useState, useEffect } from "react";
import { loadFavouriteSongsData } from "../api/api";

interface IFavouriteSongsProps {
  isSidebarOpen: boolean;
}

function PinIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="false"
      viewBox="0 0 16 16"
      fill="#1ed760"
      width="12"
      height="12"
    >
      <title>Pinned</title>
      <path d="M8.822.797a2.72 2.72 0 0 1 3.847 0l2.534 2.533a2.72 2.72 0 0 1 0 3.848l-3.678 3.678-1.337 4.988-4.486-4.486L1.28 15.78a.75.75 0 0 1-1.06-1.06l4.422-4.422L.156 5.812l4.987-1.337z"></path>
    </svg>
  );
}

function FavouriteSongsClosed({ songs }: { songs: number }) {
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsMediaHovered(true)}
      onMouseLeave={() => setIsMediaHovered(false)}
      className={`box-content overflow-visible relative hover:transition hover:duration-75 size-12 p-2 rounded-lg ${isMediaHovered ? " rounded-full bg-subdued/10" : ""}`}
    >
      <img
        className={`rounded-lg  cursor-pointer`}
        src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
      />
      <div
        className={`${isMediaHovered ? "block" : "hidden"} p-1 absolute rounded-lg w-48 h-13 z-1000 -translate-y-12 translate-x-15 bg-[#1f1f1f]`}
      >
        <div>
          <p className="text-positive">
            <span>Favourite songs</span>
          </p>
        </div>
        <div className={`justify-start items-center flex gap-1 relative`}>
          <div className="flex items-center gap-1">
            <PinIcon />
            <span className="text-subdued text-sm">Playlist</span>
          </div>
          <div>
            <span className="text-subdued text-sm">•</span>
          </div>
          <div>
            <span className="text-subdued text-sm">{songs} songs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FavouriteSongsOpen({ songs }: { songs: number }) {
  const [isMediaHovered, setIsMediaHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsMediaHovered(true)}
      onMouseLeave={() => setIsMediaHovered(false)}
      className={`${isMediaHovered ? " rounded-full bg-subdued/20" : ""} box-content flex gap-2 overflow-visible relative cursor-pointer hover:duration-75  p-2 rounded-lg`}
    >
      <img
        className={`rounded-lg  cursor-pointer size-12`}
        src="https://misc.scdn.co/liked-songs/liked-songs-64.png"
      />
      <div className="flex justify-start flex-col gap-0.5">
        <p className="text-positive text-[1rem] flex items-center">
          <span>Favourite songs</span>
        </p>
        <div className="flex items-center gap-2">
          <p className="flex gap-1 items-center text-subdued text-sm">
            <PinIcon />
            <span>Playlist • {songs} songs</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function FavouriteSongs({ isSidebarOpen }: IFavouriteSongsProps) {
  const [songs, setSongs] = useState(0);
  useEffect(() => {
    const fetchFavouriteSongsData = async () => {
      try {
        const result = await loadFavouriteSongsData();
        setSongs(result.songs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteSongsData();
  }, []);

  return isSidebarOpen ? (
    <FavouriteSongsOpen songs={songs} />
  ) : (
    <FavouriteSongsClosed songs={songs} />
  );
}
