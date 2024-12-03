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
}: {
  navBar: INavBar[];
  className?: string;
}) => {
  const router = useRouter();
  const currentHash = useHash();

  return (
    <div className={classNames("container py-fis-1", className)}>
      <ul className="w-full border-b-[1px] border-slate-100 flex gap-6">
        {navBar.map(({ title, href }) => (
          <li key={title} className="leading-[0]">
            <Link
              className={classNames(
                buttonClass,
                href === router.pathname || currentHash === `#${title}`
                  ? activeClass
                  : ""
              )}
              href={href ? href : `#${title}`}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
