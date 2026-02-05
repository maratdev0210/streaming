import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMediaViewType,
  setMediaViewType,
} from "../../model/mediaControlSlice";

function SelectedIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      fill="#1ed760"
      viewBox="0 0 16 16"
      width="16"
      height="16"
    >
      <path d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0"></path>
    </svg>
  );
}

function ListViewIcon({ isSelected }: { isSelected: boolean }) {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill={isSelected ? "#1ed760" : "#ffffffb3"}
      className="mediaViewIcon"
    >
      <path d="M15 14.5H5V13h10zm0-5.75H5v-1.5h10zM15 3H5V1.5h10zM3 3H1V1.5h2zm0 11.5H1V13h2zm0-5.75H1v-1.5h2z"></path>
    </svg>
  );
}

function DenseViewIcon({ isSelected }: { isSelected: boolean }) {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      viewBox="0 0 16 16"
      width="16"
      height="16"
      fill={isSelected ? "#1ed760" : "#ffffffe6"}
      className="mediaViewIcon"
    >
      <path d="M15.5 13.5H.5V12h15zm0-4.75H.5v-1.5h15zm0-4.75H.5V2.5h15z"></path>
    </svg>
  );
}

function PickMediaView({
  isViewOpen,
  setIsViewOpen,
}: {
  isViewOpen: boolean;
  setIsViewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const mediaViewType = useSelector(selectMediaViewType);
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsViewOpen(false);
      }
    }

    if (isViewOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isViewOpen, setIsViewOpen]);

  return (
    <div ref={modalRef} className={isViewOpen ? "pickMediaView" : "hidden"}>
      <div className="h-32 box-content">
        <ul className="bg-[#282828] rounded-sm p-1 pickMediaViewShadow">
          <li>
            <span className="pl-3 pt-3 pr-2 pb-3 h-4 text-start text-[#ffffffb3]">
              Media View Format
            </span>
          </li>
          <li className="w-full">
            <button
              onClick={() => dispatch(setMediaViewType("Dense"))}
              className="text-start w-full hover:bg-[#ffffff1a] text-[#ffffffe6] flex justify-between items-center relative pl-3 pb-2 pt-2 pr-2"
            >
              <div className="flex gap-3 items-center">
                <DenseViewIcon isSelected={mediaViewType === "Dense"} />
                <span
                  className={`text-sm ${mediaViewType === "Dense" ? "text-positive" : ""}`}
                >
                  Dense
                </span>
              </div>
              <div>{mediaViewType === "Dense" ? <SelectedIcon /> : null}</div>
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={() => dispatch(setMediaViewType("List"))}
              className="text-start w-full hover:bg-[#ffffff1a] text-[#ffffffe6] flex justify-between items-center  relative pl-3 pb-2 pt-2 pr-2"
            >
              <div className="flex gap-3 items-center">
                <ListViewIcon isSelected={mediaViewType === "List"} />
                <span
                  className={`text-sm ${mediaViewType === "List" ? "text-positive" : ""}`}
                >
                  List
                </span>
              </div>
              <div>{mediaViewType === "List" ? <SelectedIcon /> : null}</div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function MediaView() {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const mediaViewType = useSelector(selectMediaViewType);

  return (
    <div className="w-full relative cursor-pointer justify-end gap-2 flex">
      <button
        onClick={() => setIsViewOpen(!isViewOpen)}
        className="text-[#ffffffb3] gap-2 pl-2 pr-2 border-0 hover:text-white rouned-sm flex items-center h-8 cursor-pointer"
      >
        <span className="text-start text-sm font-bold hover:text-white">
          {mediaViewType}
        </span>
        {mediaViewType === "Dense" ? (
          <DenseViewIcon isSelected={false} />
        ) : (
          <ListViewIcon isSelected={false} />
        )}
      </button>
      <PickMediaView setIsViewOpen={setIsViewOpen} isViewOpen={isViewOpen} />
    </div>
  );
}
