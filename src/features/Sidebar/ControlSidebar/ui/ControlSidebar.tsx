import { useDispatch, useSelector } from "react-redux";
import { setSidebarState } from "../model/sidebarSlice";
import { selectSidebar } from "../model/sidebarSlice";
import { useState } from "react";

function CloseLibraryIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill="#b3b3b3"
    >
      <path d="M10.97 5.47a.75.75 0 1 1 1.06 1.06L10.56 8l1.47 1.47a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06z"></path>
      <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm.5 1.5H5v13H1.5zm13 13h-8v-13h8z"></path>
    </svg>
  );
}

function OpenLibraryIcon() {
  return (
    <svg
      className="transition duration-300 ease-in-out"
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      width="24"
      height="24"
      fill="#b3b3b3"
      viewBox="0 0 24 24"
    >
      <path d="M14.457 15.207a1 1 0 0 1-1.414-1.414L14.836 12l-1.793-1.793a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414z"></path>
      <path d="M20 22a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zM4 20V4h4v16zm16 0H10V4h10z"></path>
    </svg>
  );
}

function LibraryIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      width="24"
      height="24"
      fill="#b3b3b3"
      viewBox="0 0 24 24"
    >
      <path d="M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866M16 4.732V20h4V7.041zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1m6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1"></path>
    </svg>
  );
}

export function ControlSidebar() {
  const dispatch = useDispatch();
  const [isOpenLibraryHovered, setIsOpenLibraryHovered] = useState(false);

  const { isSidebarOpen, isIconShownOnHover } = useSelector(selectSidebar);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={isSidebarOpen ? "hidden" : "flex relative"}>
        <div>
          <button
            type="button"
            title={isSidebarOpen ? "close library" : "open library"}
            className="pl-2 pt-1 pr-2 pb-1 w-6 h-8 box-content cursor-pointer"
          >
            <span
              onClick={() => dispatch(setSidebarState())}
              onMouseLeave={() => setIsOpenLibraryHovered(false)}
              onMouseEnter={() => setIsOpenLibraryHovered(true)}
            >
              {isOpenLibraryHovered ? <OpenLibraryIcon /> : <LibraryIcon />}
            </span>
          </button>
        </div>
      </div>
      <div className={!isSidebarOpen ? "hidden" : "flex items-center gap-1 "}>
        <div className="flex relative">
          <button
            onClick={() => dispatch(setSidebarState())}
            type="button"
            className="text-white pl-0 pr-0 pt-1 pb-1 border-0 cursor-pointer flex items-center"
          >
            <span
              className={
                isIconShownOnHover
                  ? "translate-x-0 opacity-100 relative"
                  : "-translate-x-100 opacity-0 transition duration-300 ease-in-out block"
              }
            >
              <CloseLibraryIcon />
            </span>
            <h1
              className={`mr-3text-white font-bold ${isIconShownOnHover ? "relative left-3 duration-300 transition ease-in-out" : null}`}
            >
              My Library
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}
