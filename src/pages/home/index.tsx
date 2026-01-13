import { TracksView } from "./ui/TracksView";
import { Track } from "../../widgets/Track/ui/Track.ui";
import { Navbar } from "./ui/NavBar";
import { selectAuth } from "../../entities/auth/model/authSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const { isSuccessfullyRegistered } = useSelector(selectAuth);

  if (isSuccessfullyRegistered) {
    console.log("registered");
  }
  return (
    <>
      <Navbar />
      <TracksView />
      <Track />
    </>
  );
}
