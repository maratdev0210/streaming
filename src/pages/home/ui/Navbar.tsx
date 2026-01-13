import { useContext } from "react";
import { AuthContext } from "../../../app/AuthContext";
import { GlobalSearch } from "../../../features/Search";

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
      </div>
    </div>
  );
}
