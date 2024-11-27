import React from "react";
import type { IButtonProps } from "./Button";

interface INativeButton extends Omit<IButtonProps, "href" | "variant"> {
  onClick: () => void;
}

export default function NativeButton({
  children,
  className,
  onClick,
}: INativeButton) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
