import { Sidebar } from "../../../widgets/Sidebar/ui/Sidebar.ui";
import { Track } from "../../../widgets/Track/ui/Track.ui";
import { Navbar } from "../../../features/Navbar";
import { useSelector } from "react-redux";
import { selectLogin } from "../../../entities/login/model/loginSlice";
import { selectAuth } from "../../../entities/auth/model/authSlice";
import { useContext } from "react";
import { AuthContext } from "../../../app/AuthContext";
import { MediaHeader } from "../../../widgets/MediaHeader/ui/MediaHeader.ui";

export function CollectionTracks() {
  const { isSuccessfullyRegistered } = useSelector(selectAuth);
  const { isLoggedIn } = useSelector(selectLogin);
  const userId = useContext(AuthContext);

  if (isSuccessfullyRegistered || isLoggedIn) {
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      <div className="relative">
        <Sidebar />
        <div className="absolute mainContent h-full left-24 top-18 rounded-lg">
          <MediaHeader
            title="Favourite songs"
            author="Marat"
            coverUrl="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
            songs={3}
            mediaType="Playlist"
          />
        </div>
      </div>
      <Track />
    </>
  );
}
