import { loadFavouriteAlbums } from "../api/api";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavouriteAlbums,
  setFavouriteAlbums,
} from "../model/mediaViewSlice";
import { useEffect, useState } from "react";

interface IMediaProps {
  type: "album" | "playlist" | "artist";
  coverURL: string;
  name: string;
  artist?: string;
  creator?: string;
}

function MediaSidebarClosed({
  cover_url,
  mediaType,
  title,
  artist,
}: {
  cover_url: string;
  mediaType: string;
  artist: string;
  title: string;
}) {
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  console.log(isMediaHovered);
  return (
    <div
      onMouseEnter={() => setIsMediaHovered(true)}
      onMouseLeave={() => setIsMediaHovered(false)}
      className="box-content overflow-visible relative hover:scale-104 hover:transition hover:duration-75 size-12 p-2 rounded-lg"
    >
      <img className="rounded-lg cursor-pointer" src={cover_url} />
      <div
        className={`${isMediaHovered ? "block" : "hidden"} p-1 absolute rounded-lg w-32 h-11 z-1000 -translate-y-11 translate-x-15 bg-[#1f1f1f]`}
      >
        <div className="flex justify-center">
          <span className="font-bold text-white text-sm">{title}</span>
        </div>
        <div className="flex justify-center gap-1 relative bottom-1">
          <div>
            <span className="text-subdued text-sm">Album</span>
          </div>
          <div>
            <span className="text-subdued text-sm">{artist}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MediaView() {
  const dispatch = useDispatch();
  const favouriteAlbums = useSelector(selectFavouriteAlbums);

  useEffect(() => {
    const fetchFavouriteAlbums = async () => {
      try {
        const result = await loadFavouriteAlbums();
        dispatch(setFavouriteAlbums(result.albums));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteAlbums();
  }, []);

  console.log(favouriteAlbums);

  return (
    <>
      {favouriteAlbums.map(({ cover_url, artist, title }, index) => {
        return (
          <MediaSidebarClosed
            cover_url={cover_url}
            mediaType="album"
            title={title}
            artist={artist}
            key={index}
          />
        );
      })}
    </>
  );
}
