import classNames from "classnames";
import Link from "next/link";
import React, { PropsWithChildren, ReactElement } from "react";
import NativeButton from "./NativeButton";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "neutral" | "white";
type ButtonSize = "small" | "regular";

export interface IButtonProps extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
  variant: ButtonVariant;
  className?: string;
  size?: ButtonSize;
  LeadingIconButton?: ReactElement;
  IconButton?: ReactElement;
  disabled?: boolean;
}

const baseClass =
  "rounded-full inline-block border-transparent border-2 transition-all focus:outline-fis-blue/75";

const primaryClass =
  "bg-fis-blue/5 text-fis-purple hover:text-fis-blue hover:border-fis-blue/90 hover:bg-fis-blue/15";

const secondaryClass =
  "bg-transparent text-fis-purple !border-fis-purple hover:!border-fis-blue/90 hover:text-fis-blue hover:bg-fis-blue/5";

const tertiaryClass =
  "bg-gray-50 text-fis-purple hover:bg-fis-blue/5 hover:text-fis-blue hover:border-fis-blue/30";

const neutralClass =
  "bg-transparent text-fis-purple hover:bg-fis-blue/5 hover:text-fis-blue";

const whiteClass =
  "bg-white text-fis-purple hover:text-fis-blue hover:border-fis-blue/90 hover:bg-fis-blue/15";

const getVariantClassNames = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return primaryClass;
    case "secondary":
      return secondaryClass;
    case "tertiary":
      return tertiaryClass;
    case "neutral":
      return neutralClass;
    case "white":
      return whiteClass;
    default:
      return primaryClass;
  }
};

const smallClass = "px-[12px] py-[8px] text-sm !rounded-2lg";
const regularClass = "px-[25px] py-[8px] text-xl";

const getSizeClassName = (size: ButtonSize) => {
  switch (size) {
    case "small":
      return smallClass;
    case "regular":
      return regularClass;
    default:
      return regularClass;
  }
};

export default function Button({
  size = "regular",
  children,
  href,
  onClick,
  variant,
  className,
  IconButton,
LeadingIconButton,
disabled,
}: IButtonProps) {
  const variantClassNames = getVariantClassNames(variant);
  const sizeClassNames = getSizeClassName(size);

  const finalClassNames = classNames(
    baseClass,
    sizeClassNames,
    variantClassNames,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={finalClassNames}>
        <div className="flex items-center">
          {LeadingIconButton && <div className="mr-2 w-[16px]">{LeadingIconButton}</div>}
          <span>
            {children}
          </span>
          {IconButton && <div className="ml-2 w-[16px]">{IconButton}</div>}
        </div>
      </Link>
    );
  }

  if (onClick) {
    return (
      <NativeButton onClick={onClick} disabled={disabled} className={finalClassNames}>
        <div className="flex items-center">
          {LeadingIconButton && <div className="mr-2 w-[16px]">{LeadingIconButton}</div>}
          <span>
            {children}
          </span>
          {IconButton && <div className="ml-2 w-[16px]">{IconButton}</div>}
          </div>
      </NativeButton>
    );
  }

  return null;
}
