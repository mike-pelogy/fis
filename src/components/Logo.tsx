import Image from "next/image";
import React from "react";

export default function Logo({
  dimensions,
  className,
}: {
  dimensions?: { width: number; height: number };
  className?: string;
}) {
  const { width = 179, height = 43 } = dimensions || {};
  return (
      <Image
        src="/Full-Logo-Horizontal-Full-Color-Light-Mode.png"
        alt="Faith Investor Services logo"
        width={width}
        height={height}
        className={className}
      />
  );
}
