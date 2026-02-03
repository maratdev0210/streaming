import { loadFavouriteAlbums, loadFavouriteArtists } from "../api/api";
import { selectSidebar } from "../../ControlSidebar/model/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavouriteAlbums,
  selectFavouriteArtists,
  setFavouriteAlbums,
  setFavouriteArtists,
} from "../model/mediaViewSlice";
import { FavouriteSongs } from "./FavouriteSongs";
import { useEffect, useState } from "react";
import { is } from "zod/v4/locales";

interface ImediaSidebarProps {
  cover_url: string;
  mediaType: "Album" | "Artist" | "Playlist";
  title?: string;
  artist: string;
}

function MediaSidebarClosed({
  cover_url,
  mediaType,
  title,
  artist,
}: ImediaSidebarProps) {
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsMediaHovered(true)}
      onMouseLeave={() => setIsMediaHovered(false)}
      className={`box-content overflow-visible relative hover:transition hover:duration-75 size-12 p-2 rounded-lg ${isMediaHovered ? " rounded-full bg-subdued/10" : ""}`}
    >
      <img
        className={`${mediaType === "Album" ? "rounded-lg" : "rounded-full"}  cursor-pointer`}
        src={cover_url}
      />
      <div
        className={`${isMediaHovered ? "block" : "hidden"} p-1 absolute rounded-lg w-32 h-11 z-1000 -translate-y-11 translate-x-15 bg-[#1f1f1f]`}
      >
        <div className="flex">
          {mediaType === "Album" ? (
            <span className="font-bold text-white text-sm">{title}</span>
          ) : (
            <span className="font-bold text-white text-sm">{artist}</span>
          )}
        </div>
        <div
          className={`${mediaType === "Artist" ? "justify-start" : "justify-center"} flex  gap-1 relative bottom-1`}
        >
          <div>
            <span className="text-subdued text-sm">{mediaType}</span>
          </div>
          <div className={mediaType === "Album" ? "" : "hidden"}>
            <span className="text-subdued text-sm">•</span>
          </div>
          {mediaType === "Album" ? (
            <div>
              <span className="text-subdued text-sm">{artist}</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MediaSidebarOpen({
  cover_url,
  mediaType,
  title,
  artist,
}: ImediaSidebarProps) {
  const [isMediaHovered, setIsMediaHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsMediaHovered(true)}
      onMouseLeave={() => setIsMediaHovered(false)}
      className={`${isMediaHovered ? " rounded-full bg-subdued/20" : ""} box-content flex gap-2 overflow-visible relative cursor-pointer hover:duration-75  p-2 rounded-lg`}
    >
      <img
        className={`${mediaType === "Album" ? "rounded-lg" : "rounded-full"} cursor-pointer size-12`}
        src={cover_url}
      />
      <div className="flex justify-start flex-col gap-0.5">
        <p className="text-white text-[1rem] flex items-center">
          {mediaType === "Album" ? <span>{title}</span> : <span>{artist}</span>}
        </p>
        <div className="flex items-center gap-2">
          <p className="flex items-center text-subdued text-sm">
            {mediaType === "Album" ? (
              <span>
                {mediaType} • {artist}
              </span>
            ) : (
              <span>{mediaType}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export function MediaView() {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector(selectSidebar);
  const favouriteAlbums = useSelector(selectFavouriteAlbums);
  const favouriteArtists = useSelector(selectFavouriteArtists);

  console.log(favouriteArtists);

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

  useEffect(() => {
    const fetchFavouriteArtists = async () => {
      try {
        const result = await loadFavouriteArtists();
        dispatch(setFavouriteArtists(result.artists));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavouriteArtists();
  }, []);

  return (
    <>
      <FavouriteSongs isSidebarOpen={isSidebarOpen} />
      {favouriteAlbums.map(({ cover_url, artist, title }, index) => {
        return isSidebarOpen ? (
          <MediaSidebarOpen
            cover_url={cover_url}
            mediaType="Album"
            title={title}
            artist={artist}
            key={index}
          />
        ) : (
          <MediaSidebarClosed
            cover_url={cover_url}
            mediaType="Album"
            title={title}
            artist={artist}
            key={index}
          />
        );
      })}
      {favouriteArtists.map(({ cover_url, artist }, index) => {
        return isSidebarOpen ? (
          <MediaSidebarOpen
            cover_url={cover_url}
            mediaType="Artist"
            artist={artist}
            key={index}
          />
        ) : (
          <MediaSidebarClosed
            cover_url={cover_url}
            mediaType="Artist"
            artist={artist}
            key={index}
          />
        );
      })}
    </>
  );
}
