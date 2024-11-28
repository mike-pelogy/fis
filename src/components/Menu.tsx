import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

export interface IMenuItem {
  title: string;
  path: string;
  children?: IMenuItem[];
}

export const beforeClass =
  "relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:scale-0 before:bg-fis-purple before:transition-all before:origin-left";
export const hoverClass =
  "[&>a]:hover:before:bg-fis-blue [&>a]:hover:before:scale-100";

export default function Menu({
  menu,
  className,
}: {
  className?: string;
  menu: IMenuItem[];
}) {
  const { pathname } = useRouter();

  return (
    <ul className={classNames("flex gap-6", className)}>
      {menu.map(({ title, path, children }) => (
        <div className="relative group" key={title}>
          <li
            className={classNames(
              "text-base font-bold hover:text-fis-blue transition-all leading-0",
              hoverClass,
              {
                "text-fis-purple [&>a]:before:scale-100":
                  pathname === path ||
                  children?.find((c) => c.path === pathname) ||
                  pathname.includes(path) && path !== '/',
              }
            )}
          >
            <Link
              className={classNames(
                "relative leading-6 inline-block",
                beforeClass
              )}
              href={path}
            >
              {title}
            </Link>
          </li>
          {children && (
            <div
              className={classNames(
                "drop-shadow-xl rounded bg-white py-3 px-4 absolute top-[100%] z-10 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all",
                {
                  "-left-4 min-w-[200px]": ![
                    "/news-and-insights",
                    "/contact",
                  ].includes(path),
                  "-right-4": ["/news-and-insights", "/contact"].includes(path),
                }
              )}
            >
              <Menu
                className="flex-col !gap-2 [&>li]:text-small"
                menu={children}
              />
            </div>
          )}
        </div>
      ))}
    </ul>
  );
}
