import { useState } from "react";
import { Link } from "react-router";
import { logout } from "../api/api";

function ExternalLinkIcon() {
  return (
    <div>
      <svg
        data-encore-id="icon"
        role="img"
        aria-hidden="false"
        viewBox="0 0 16 16"
        width="16"
        height="16"
        fill="white"
      >
        <path d="M1 2.75A.75.75 0 0 1 1.75 2H7v1.5H2.5v11h10.219V9h1.5v6.25a.75.75 0 0 1-.75.75H1.75a.75.75 0 0 1-.75-.75z"></path>
        <path d="M15 1v4.993a.75.75 0 1 1-1.5 0V3.56L8.78 8.28a.75.75 0 0 1-1.06-1.06l4.72-4.72h-2.433a.75.75 0 0 1 0-1.5z"></path>
      </svg>
    </div>
  );
}

export function Profile() {
  const [isMenuShown, setIsMenuShown] = useState(false);
  return (
    <div className="flex w-full justify-end items-center relative">
      {isMenuShown && (
        <div className="absolute z-100 profile-picture-menu">
          <div className="w-82">
            <ul className="bg-[#282828] rounded-sm p-1 profile-picture-menu-list">
              <li>
                <button className="flex hover:bg-white/10 w-full text-start gap-3 h-10 justify-between items-center pl-3 pt-2 pb-2 pr-2">
                  <span className="text-white ">Account</span>
                  <ExternalLinkIcon />
                </button>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="unerline cursor-default hover:underline decoration-white"
                >
                  <span className="text-white  w-full block text-start pl-3 pt-2 pb-2 pr-2 h-10 hover:bg-white/10">
                    Profile
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/preferences"
                  className=" cursor-default hover:underline decoration-white"
                >
                  <span className="text-white w-full block text-start pl-3 pt-2 pb-2 pr-2 h-10 hover:bg-white/10">
                    Preferences
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className="flex border-t-white/10 border-t hover:border-0  hover:bg-white/10 w-full text-start gap-3 h-10 justify-between items-center pl-3 pt-2 pb-2 pr-2"
                >
                  <span className="text-white">Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsMenuShown(!isMenuShown)}
        className="box-content hover:scale-104 hover:transition hover:duration-75 cursor-pointer flex justify-center items-center size-12 bg-[#1f1f1f] border-0 rounded-full"
      >
        <span className="size-8  rounded-full flex justify-center items-center profile-picture">
          M
        </span>
      </button>
    </div>
  );
}
