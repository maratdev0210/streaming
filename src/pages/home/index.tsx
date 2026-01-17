import { Sidebar } from "./ui/Sidebar";
import { Track } from "../../widgets/Track/ui/Track.ui";
import { Navbar } from "./ui/Navbar";
import { selectAuth } from "../../entities/auth/model/authSlice";
import { selectLogin } from "../../entities/login/model/loginSlice";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { AuthContext } from "../../app/AuthContext";

export default function Home() {
  const { isSuccessfullyRegistered } = useSelector(selectAuth);
  const { isLoggedIn } = useSelector(selectLogin);
  const userId = useContext(AuthContext);

  if (isSuccessfullyRegistered || isLoggedIn) {
    window.location.reload();
  }

  return (
    <>
      <div className="relative">
        <Navbar />
        {userId !== null && <Sidebar />}
        <Track />
      </div>
    </>
  );
}
