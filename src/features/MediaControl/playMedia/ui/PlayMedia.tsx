function PlayMediaIcon() {
  return (
    <svg
      data-encore-id="icon"
      role="img"
      aria-hidden="true"
      width="24"
      height="24"
      fill="black"
      viewBox="0 0 24 24"
    >
      <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path>
    </svg>
  );
}

export function PlayMedia() {
  return (
    <div className="size-14 cursor-pointer">
      <button className="text-center size-14 bg-positive rounded-full cursor-poitner transition duration-75 hover:scale-104">
        <span className="flex justify-center items-center cursor-pointer relative">
          <span>
            <PlayMediaIcon />
          </span>
        </span>
      </button>
    </div>
  );
}
