import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface INavBar {
  title: string;
  href?: string;
  active?: string;
}

const buttonClass =
  "text-lg text-fis-blue block leading-[2em] hover:text-fis-purple transition-all hover:border-fis-purple border-b-2 border-transparent";
const activeClass = "!text-fis-purple !border-fis-purple";

const getHash = () =>
  typeof window !== "undefined" ? window.location.hash : undefined;

const useHash = () => {
  const [isClient, setIsClient] = useState(false);
  const [hash, setHash] = useState(getHash());
  const params = useParams();

  useEffect(() => {
    setIsClient(true);
    setHash(getHash());
  }, [params]);

  return isClient ? hash : null;
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
  const currentHash = useHash();

  console.log(router.pathname, router.asPath);
  return (
    <div
      className={classNames(
        "container py-fis-1 w-full px-4 md:px-0",
        className
      )}
    >
      <ul className="w-full overflow-x-auto border-b-[1px] border-slate-100 flex gap-6">
        {navBar.map(({ title, href }) => (
          <li key={title} className="leading-[0] mb-[4px] md:mb-0">
            <Link
              className={classNames(
                buttonClass,
                "whitespace-nowrap",
                href === router.pathname ||
                  href === router.asPath ||
                  currentHash === `#${title}` ||
                  active === title
                  ? activeClass
                  : ""
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
        ))}
      </ul>
    </div>
  );
};
