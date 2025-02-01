import React from "react";
import dynamic from "next/dynamic";
import type { ReactPlayerProps } from "react-player";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface IVideoPlayerProps extends ReactPlayerProps {
  src: string;
  overlayImageSrc?: string;
}

export default function VideoPlayer({
  src,
  overlayImageSrc = "/defaultFeaturedImage.png",
  ...rest
}: IVideoPlayerProps) {
  return (
    <div className="flex w-full h-full [&>div]:pt-[56.25%] [&>div]:relative [&>div>div]:absolute [&>div>div]:top-0 [&>div>video]:absolute [&>div>video]:top-0">
      <ReactPlayer
        url={src}
        light={overlayImageSrc}
        controls
        {...rest}
        height={"100%"}
        width={"100%"}
      />
    </div>
  );
}
