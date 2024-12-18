import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

export interface IMenuItem {
  title: string;
  path: string;
  children?: IMenuItem[];
}

export const beforeClass = "border-b-2 border-transparent";

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
              {
                "text-fis-purple [&>a]:before:scale-100":
                  pathname === path ||
                  children?.find((c) => c.path === pathname) ||
                  (pathname.includes(path) && path !== "/"),
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

export function MenuLayer({
  menu,
  className,
  layer = 1,
  isMobile,
}: {
  className?: string;
  menu: IMenuItem[];
  layer?: number;
  isMobile?: boolean;
}) {
  const { pathname } = useRouter();

  return (
    <div>
      <ul className={classNames("flex gap-6", className)}>
        {menu.map(({ title, path, children }) => (
          <div className="relative group" key={title}>
            <li
              className={classNames(
                "text-base font-bold hover:text-fis-blue transition-all leading-0",
                {
                  "text-fis-purple [&>a]:before:scale-100":
                    pathname === path ||
                    children?.find((c) => c.path === pathname) ||
                    (pathname.includes(path) && path !== "/"),
                }
              )}
            >
              <Link
                className={classNames(
                  "relative leading-6 inline-block whitespace-nowrap",
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
                  "rounded px-4 z-10 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all",
                  {
                  "py-1 bg-slate-100": isMobile,
                    "drop-shadow-xl bg-white absolute top-[100%] opacity-0 py-3": !isMobile,
                    "-left-4 min-w-[225px] w-auto":
                      !["/news-and-insights", "/contact"].includes(path) &&
                      !isMobile,
                    "-right-4": ["/news-and-insights", "/contact"].includes(
                      path
                    ),
                    "!relative pl-6 drop-shadow-none": layer >= 2,
                  }
                )}
              >
                <MenuLayer
                  className="flex-col !gap-2 [&>li]:text-small"
                  menu={children}
                  isMobile={isMobile}
                  layer={layer + 1}
                />
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}
