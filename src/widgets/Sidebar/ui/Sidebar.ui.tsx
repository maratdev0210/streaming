import {
  ControlSidebar,
  CreateMedia,
  MediaView,
} from "../../../features/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { selectSidebar } from "../../../features/Sidebar/ControlSidebar/model/sidebarSlice";
import { setIconShownOnHover } from "../../../features/Sidebar/ControlSidebar/model/sidebarSlice";

export function Sidebar() {
  const { isSidebarOpen } = useSelector(selectSidebar);
  const dispatch = useDispatch();

  return (
    <div
      onMouseEnter={() => dispatch(setIconShownOnHover(true))}
      onMouseLeave={() => dispatch(setIconShownOnHover(false))}
      className={`${isSidebarOpen ? "w-90" : "w-18"} z-4 mt-16 left-2 sidebar-height flex fixed bg-background-base rounded-lg flex-col`}
    >
      <nav className="flex flex-col gap-2 h-full">
        <div className="flex flex-col w-full relative flex-1 bg-background-base rounded-lg">
          <div>
            <header className="flex flex-col gap-4 pl-4 pt-4 pr-4 pb-2 relative">
              <div
                className={
                  isSidebarOpen
                    ? "sidebar-control-open"
                    : "sidebar-control-closed"
                }
              >
                <ControlSidebar />
                <CreateMedia />
              </div>
            </header>
          </div>
          <div className="pl-1 pb-1 pr-1 flex flex-col gap-2">
            <MediaView />
          </div>
        </div>
      </nav>
    </div>
  );
}
