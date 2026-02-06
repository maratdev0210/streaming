import { Sidebar } from "../../../widgets/Sidebar/ui/Sidebar.ui";
import { Track } from "../../../widgets/Track/ui/Track.ui";
import { Navbar } from "../../../features/Navbar";
import { useSelector } from "react-redux";
import { selectLogin } from "../../../entities/login/model/loginSlice";
import { selectAuth } from "../../../entities/auth/model/authSlice";
import { useContext } from "react";
import { AuthContext } from "../../../app/AuthContext";
import { MediaHeader } from "../../../widgets/MediaHeader/ui/MediaHeader.ui";
import { selectPlaylist } from "../../../entities/collection/model/collectionSlice";
import { MediaControl } from "../../../widgets/MediaControl/ui/MediaControl.ui";
import { selectSidebar } from "../../../features/Sidebar/ControlSidebar/model/sidebarSlice";
import { MediaList } from "../../../features/MediaControl";
import type { RootState } from "../../../app/store/store";

export function CollectionTracks() {
  const { isSuccessfullyRegistered } = useSelector(selectAuth);
  const { isLoggedIn } = useSelector(selectLogin);
  const { isSidebarOpen } = useSelector(selectSidebar);

  const userId = useContext(AuthContext);

  const favouriteSongs = useSelector((state: RootState) =>
    selectPlaylist(state, "Favourite Songs")
  )[0];

  console.log(favouriteSongs.tracks);

  if (isSuccessfullyRegistered || isLoggedIn) {
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      <div className="relative">
        <Sidebar />
        <div
          className={`${isSidebarOpen ? "left-96 mainContentSidebarOpen" : "left-24 mainContentSidebarClosed"} absolute h-full top-18 rounded-lg`}
        >
          <MediaHeader
            title="Favourite songs"
            author="Marat"
            coverUrl="https://misc.scdn.co/liked-songs/liked-songs-300.jpg"
            songs={favouriteSongs.songs}
            mediaType="Playlist"
          />
          <MediaControl />
          <MediaList />
        </div>
      </div>
      <Track />
    </>
  );
}
