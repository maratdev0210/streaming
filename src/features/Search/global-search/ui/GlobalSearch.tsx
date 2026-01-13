import { useState } from "react";
import type { FormEvent } from "react";

export function GlobalSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="relative w-full" onSubmit={onSearchSubmit}>
      <div className="z-1 flex absolute top-1/2 -translate-y-1/2 size-12 ">
        <button className="p-3 border-0 cursor-pointer text-center">
          <svg
            className="icon-base-large"
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="white"
            width="24"
            height="24"
          >
            <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path>
          </svg>
        </button>
      </div>
      <div>
        <input
          className="w-82.5 text-white box-content  h-6 pt-3 pb-3 pl-12 pr-24  rounded-full bg-[#1f1f1f]"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What do you want to play?"
        />
      </div>
      <div className="flex right-3 absolute top-1/2 -translate-y-1/2 box-content">
        <button
          onClick={() => setSearchQuery("")}
          className={`${searchQuery.length === 0 ? "hidden" : "inline-block"} pl-3 pr-3 w-auto h-auto box-content cursor-pointer text-center rounded-full border-0`}
        >
          <span aria-hidden="true">
            <svg
              data-encore-id="icon"
              role="img"
              aria-hidden="true"
              className="icon-base-large"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414"></path>
            </svg>
          </span>
        </button>
        <div className=" border-l border-l-essential-subdued">
          <button className="pl-3 pr-3 w-full h-full box-content cursor-pointer  text-center rounded-full border-0">
            <span aria-hidden="true">
              <svg
                data-encore-id="icon"
                role="img"
                aria-hidden="true"
                className="icon-base-large"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2"></path>
                <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
