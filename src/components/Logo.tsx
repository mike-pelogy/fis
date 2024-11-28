import Image from "next/image";
import React from "react";

export default function Logo({
  dimensions,
}: {
  dimensions?: { width: number; height: number };
}) {
  const { width = 179, height = 43 } = dimensions || {};
  return (
    <div>
      <Image
        src="/Full-Logo-Horizontal-Full-Color-Light-Mode.png"
        alt="Faith Investor Services logo"
        width={width}
        height={height}
      />
    </div>
  );
}
