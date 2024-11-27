import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";

interface IMenuItem {
  title: string;
  path: string;
  children?: IMenuItem[];
}

const beforeClass =
  "relative before:content-[''] before:absolute before:w-full before:h-[2px] before:bottom-0 before:left-0 before:scale-0 before:bg-fis-purple before:transition-all before:origin-left";
const hoverClass =
  "[&>a]:hover:before:bg-fis-blue [&>a]:hover:before:scale-100";

const Menu = ({
  menu,
  className,
}: {
  className?: string;
  menu: IMenuItem[];
}) => {
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
                  children?.find((c) => c.path === pathname),
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
                "drop-shadow-xl rounded bg-white py-2 px-4 absolute top-[100%] z-10 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-all",
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
};

// TODO: get data for top nav
// and make mobile menu :D
export default function Header() {
  return (
    <header className="flex justify-center h-[100px] p-4 sticky top-0 left-0 bg-white relative z-10">
      <div className="container w-full flex items-center justify-between">
        <div>logo</div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-end gap-6">
            <a
              href="#"
              className={classNames(
                beforeClass,
                "text-fis-purple hover:before:bg-fis-blue hover:before:scale-100 hover:text-fis-blue"
              )}
            >
              Form CRS
            </a>
            <a
              href="#"
              className={classNames(
                beforeClass,
                "text-fis-purple hover:before:bg-fis-blue hover:before:scale-100 hover:text-fis-blue"
              )}
            >
              ADV Disclosures
            </a>
            <div className="flex gap-2">
              {[
                { icon: "facebook", url: "" },
                { icon: "linkedin", url: "" },
                { icon: "twitter", url: "" },
              ].map(({ url, icon }) => (
                <a key={icon} href={url} target="_blank">
                  {icon}
                </a>
              ))}
            </div>
            <a
              href="tel:833-833-1311"
              className={classNames(
                beforeClass,
                "text-fis-purple hover:before:bg-fis-blue hover:before:scale-100 hover:text-fis-blue"
              )}
            >
              833-833-1311
            </a>
            <button onClick={() => console.log("search")}>search icon</button>
          </div>
          <Menu
            menu={[
              { title: "Home", path: "/" },
              { title: "Wealth Management", path: "/wealth-management" },
              { title: "Services", path: "/services" },
              {
                title: "Etfs",
                path: "/etfs",
                children: [
                  { title: "KOCG", path: "/etfs/kocg" },
                  { title: "PRAY", path: "/etfs/pray" },
                ],
              },
              { title: "About", path: "/about" },
              { title: "News and Insights", path: "/news-and-insights" },
              {
                title: "Contact",
                path: "/contact",
                children: [{ title: "Careers", path: "/contact/careers" }],
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
