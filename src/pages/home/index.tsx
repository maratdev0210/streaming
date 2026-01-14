import { TracksView } from "./ui/TracksView";
import { Track } from "../../widgets/Track/ui/Track.ui";
import { Navbar } from "./ui/Navbar";
import { selectAuth} from "../../entities/auth/model/authSlice";
import { selectLogin } from "../../entities/login/model/loginSlice";
import { useSelector } from "react-redux";

export default function Home() {
  const { isSuccessfullyRegistered } = useSelector(selectAuth);
  const {isLoggedIn} = useSelector(selectLogin);

  if (isSuccessfullyRegistered || isLoggedIn) {
    window.location.reload();
  }

  return (
    <>
      <Navbar />
      <TracksView />
      <Track />
    </>
  );
}
