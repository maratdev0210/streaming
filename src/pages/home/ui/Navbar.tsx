import { useContext } from "react";
import { AuthContext } from "../../../app/AuthContext";
import { GlobalSearch } from "../../../features/Search";
import { Link } from "react-router";
import { Profile } from "../../../widgets/Profile/ui/Profile.ui";

export function Navbar() {
  const userId = useContext(AuthContext);
  return (
    <div className="bg-black p-2  flex justify-between items-center h-16 fixed top-0 w-full">
      <div className="flex justify-start flex-1 gap-0 w-full items-center">
        <div className="min-w-auto w-full max-w-136 flex">
          <button className="p-3 size-12 box-border cursor-pointer text-white flex items-center justify-center bg-[#1f1f1f] rounded-[50%]">
            <span aria-hidden="true">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                className="icon-base-large"
              >
                <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732z"></path>
              </svg>
            </span>
          </button>
          <div className="pl-2 pr-2 h-12 w-full relative">
            <GlobalSearch />
          </div>
        </div>
        {userId === null && (
          <div className="flex w-full justify-end items-center">
            <div className="flex gap-2 items-center">
              <button className="pt-1 pb-1 pl-2 pr-4 hover:transition hover:duration-50 hover:text-white box-content border-0 cursor-pointer text-center text-[#656565] font-bold text-sm">
                <Link to="/auth/signup">Sign Up</Link>
              </button>
              <button className="font-bold hover:transition hover:duration-150 hover:opacity-90 bg-white rounded-full cursor-pointer box-content h-8 w-27 pt-2 pb-2 pl-8 pr-8">
                <Link to="/auth/login">
                  <span className="text-black">Sign In</span>
                </Link>
              </button>
            </div>
          </div>
        )}
        {userId !== null && <Profile />}
      </div>
    </div>
  );
}
