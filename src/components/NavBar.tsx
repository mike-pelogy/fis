import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface INavBar {
  title: string;
  href?: string;
  active?: string;
}

const buttonClass =
  "text-lg text-fis-blue block leading-[2em] hover:text-fis-purple transition-all hover:border-fis-purple border-b-2 border-transparent";
const activeClass = "!text-fis-purple !border-fis-purple";

const Li = ({
  title,
  href,
  isActive,
  handleOnClick,
}: {
  title: string;
  href?: string;
  isActive: boolean;
  handleOnClick?: (title: string) => void;
}) => {
  return (
    <li className="leading-[0] mb-[4px] md:mb-0">
      <Link
        className={classNames(
          buttonClass,
          "whitespace-nowrap",
          isActive ? activeClass : ""
        )}
        href={href ? href : `#${title}`}
        onClick={(e) => {
          if (handleOnClick) {
            e.preventDefault();
            handleOnClick(title);
          }
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export const NavBar = ({
  navBar,
  className,
  active,
  handleOnClick,
}: {
  navBar: INavBar[];
  className?: string;
  active?: string;
  handleOnClick?: (title: string) => void;
}) => {
  const router = useRouter();

  return (
    <div
      className={classNames(
        "container py-fis-1 w-full px-4 md:px-0",
        className
      )}
    >
      <ul className="w-full overflow-x-auto border-b-[1px] border-slate-100 flex gap-6">
        {navBar.map(({ title, href }) => {
          const isActive =
            href === router.pathname ||
            href === router.asPath ||
            (href === active && typeof active === "string") ||
            (title === active && typeof active === "string");

          return (
            <Li
              key={title}
              title={title}
              href={href}
              handleOnClick={handleOnClick}
              isActive={isActive}
            />
          );
        })}
      </ul>
    </div>
  );
};
