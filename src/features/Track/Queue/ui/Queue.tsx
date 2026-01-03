export function Queue() {
  return (
    <button
      aria-label="Queue"
      className="bg-transparent border-0 rounded-full cursor-pointer p-2"
    >
      <span>
        <svg className="icon-base">
          <path d="M15 15H1v-1.5h14zm0-4.5H1V9h14zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5m2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2z"></path>
        </svg>
      </span>
    </button>
  );
}
