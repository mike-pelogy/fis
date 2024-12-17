import PlayButton from "@/svgs/PlayButton";
import classNames from "classnames";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface IVideoPlayerProps {
  src: string;
  overlayImageSrc?: string;
}

export default function VideoPlayer({
  src,
  overlayImageSrc = "/defaultFeaturedImage.png",
}: IVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative rounded w-full aspect-video overflow-hidden border-[1px] border-slate-200">
      <div
        className={classNames(
          { hidden: isPlaying },
          "cursor-pointer group relative"
        )}
        onClick={() => {
          if (videoRef) {
            videoRef.current?.play();
          }
        }}
      >
        <Image
          src={overlayImageSrc}
          alt="video overlay"
          width={1920}
          height={1080}
          className="w-full aspect-video object-cover"
        />
        <div className="transition-all w-full group-hover:scale-[1.05] absolute h-full flex justify-center items-center left-0 top-0 bg-slate-500/20 group-hover:bg-slate-500/10">
          <PlayButton />
        </div>
      </div>
      <video
        controls
        ref={videoRef}
        onPlay={() => {
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        src={src}
      />
    </div>
  );
}
