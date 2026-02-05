import type { MediaHeaderProps } from "../model/model";

export function MediaHeader({ mediaType, title, coverUrl, author, songs }: MediaHeaderProps) {
  return (
    <div className="h-62.5 w-full box-border rounded-tr-lg rounded-tl-lg">
      <div className="bg-[#5038a0] w-full h-full rounded-tr-lg rounded-tl-lg">
        <div className="flex items-center w-full h-full pl-5 pr-5">
          <div className="mr-5">
            <div>
              <img
                className="size-50 rounded-sm likedImageCover"
                src={coverUrl}
              />
            </div>
          </div>
          <div className="flex flex-col justify-end flex-end flex-1 w-full h-full box-border pt-4 pb-4">
            <span className="flex items-center text-sm text-white font-bold">
              {mediaType}
            </span>
            <span>
              <span className="text-start p-0.5 -m-0.5 w-full h-26 block">
                <h1 className="text-7xl text-white font-extrabold">
                  {title}
                </h1>
              </span>
            </span>
            <div className="flex items-center mb-2">
              <div className="text-white">
                <span className="text-sm font-bold">{author}</span>
              </div>
              <span className="text-subdued text-sm mr-1 ml-1">•</span>
              <div className="flex items-center">
                <span className="text-sm text-white/90">{songs} songs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
