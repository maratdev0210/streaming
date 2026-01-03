import { useSelector } from "react-redux";
import { selectTrack } from "../../../../entities/track/model/trackSlice";
import { useEffect, useRef } from "react";

export function AudioPlayer() {
  const { src, isRepeated, isPlaying, listeningTime, volume } =
    useSelector(selectTrack);
  const audioRef = useRef(new Audio(src));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = isRepeated;
    audio.currentTime = listeningTime;
    audio.volume = volume / 100;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Failed to play audio: ", error);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, isRepeated, volume, listeningTime]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = src;
    audio.load();

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [src]);

  return <div className="invisible none"></div>;
}
