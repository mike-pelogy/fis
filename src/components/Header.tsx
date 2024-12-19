import React, { ReactElement, useEffect, useState } from "react";
import classNames from "classnames";
import { MenuLayer } from "./Menu";
import type { IMenuItem } from "./Menu";
import Logo from "./Logo";
import Link from "next/link";
import Twitter from "@/svgs/Twitter";
import Linkedin from "@/svgs/Linkedin";
import Facebook from "@/svgs/Facebook";
import ExternalLink from "@/svgs/ExternalLink";
import Search from "@/svgs/Search";
import Phone from "@/svgs/Phone";
import SearchModal, { useHtmlOverflow } from "./SearchModal";
import Hamburger from "@/svgs/Hamburger";
import Close from "@/svgs/Close";
import { useRouter } from "next/router";

export const menu: IMenuItem[] = [
  { title: "Home", path: "/" },
  { title: "Wealth Management", path: "/wealth-management" },
  {
    title: "Services",
    path: "/services/individuals/financial-planning",
    children: [
      {
        title: "Individuals",
        path: "/services/individuals/financial-planning",
        children: [
          {
            title: "Financial Planning",
            path: "/services/individuals/financial-planning",
          },
          {
            title: "Investment Management",
            path: "/services/individuals/investment-management",
          },
        ],
      },
      {
        title: "Companies not for profit organizations",
        path: "/services/companies-not-for-profit-organizations/retirement-plans",
        children: [
          {
            title: "Retirement Plans",
            path: "/services/companies-not-for-profit-organizations/retirement-plans",
          },
          {
            title: "Endowments",
            path: "/services/companies-not-for-profit-organizations/endowments",
          },
        ],
      },
      {
        title: "Separately Managed Accounts (SMA)",
        path: "/services/separately-managed-accounts",
      },
    ],
  },
  {
    title: "Etfs",
    path: "/etfs/kocg",
    children: [
      { title: "KOCG", path: "/etfs/kocg" },
      { title: "PRAY", path: "/etfs/pray" },
    ],
  },
  {
    title: "About",
    path: "/about",
    children: [
      { title: "Mission", path: "/about#mission" },
      { title: "Values", path: "/about#values" },
      { title: "Team", path: "/about#team" },
    ],
  },
  { title: "News and Insights", path: "/news-and-insights/category/faith-retirement" },
  {
    title: "Contact",
    path: "/contact",
  },
];

export const FormAndADV = ({
  color = "text-fis-purple",
}: {
  color?: string;
}) => {
  return (
    <>
      <a
        target="_blank"
        href="https://adviserinfo.sec.gov/firm/summary/313337"
        className={classNames("hover:text-fis-blue transition-all", color)}
      >
        Form CRS
        <span className="inline-block w-[1rem] h-[0.9rem] ml-2">
          <ExternalLink />
        </span>
      </a>
      <a
        target="_blank"
        href="https://adviserinfo.sec.gov/firm/summary/313337"
        className={classNames("hover:text-fis-blue transition-all", color)}
      >
        ADV Disclosures
        <span className="inline-block w-[1rem] h-[0.9rem] ml-2">
          <ExternalLink />
        </span>
      </a>
    </>
  );
};

type SocialIconType = "facebook" | "linkedin" | "twitter";

interface ISocial {
  icon: SocialIconType;
  url: string;
}

const iconMap: { [icon in SocialIconType]: () => ReactElement } = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
};

const getIconMap = (icon: SocialIconType) => {
  return iconMap[icon];
};

const socials: ISocial[] = [
  { icon: "facebook", url: "" },
  { icon: "linkedin", url: "" },
  { icon: "twitter", url: "" },
];

export const SocialAndPhone = () => {
  return (
    <>
      {socials.map(({ url, icon }) => (
        <a
          key={icon}
          href={url}
          target="_blank"
          className="flex w-[20px] h-[20px] flex justify-center text-fis-purple hover:text-fis-blue transition-all"
        >
          {getIconMap(icon)()}
        </a>
      ))}
      <a
        href="tel:833-833-1311"
        className={classNames("text-fis-purple hover:text-fis-blue")}
      >
        <span className="inline-block w-[1rem] h-[0.9rem] mr-2">
          <Phone />
        </span>
        833-833-1311
      </a>
    </>
  );
};

const TopBar = ({ openSearch }: { openSearch: (val: boolean) => void }) => {
  return (
    <div className="flex flex-row justify-start md:justify-end flex-wrap gap-4 md:gap-6">
      <FormAndADV />
      <div className="flex gap-4 md:gap-6">
        <SocialAndPhone />
      </div>
      <button
        onClick={() => openSearch(true)}
        className="text-fis-blue hover:text-fis-purple transition-all"
      >
        <Search />
      </button>
    </div>
  );
};

const MobileMenu = ({
  openSearch,
  onClose,
}: {
  onClose: () => void;
  openSearch: (val: boolean) => void;
}) => {
  useHtmlOverflow();

  return (
    <div className="w-full h-full fixed top-0 left-0 flex flex-col z-[1000001] bg-white">
      <div className="w-full flex items-center justify-between p-4 h-[80px]">
        <Link href="/" className="h-full">
          <Logo
            dimensions={{ width: 237, height: 57 }}
            className="h-full w-auto"
          />
        </Link>
        <button onClick={onClose} className="text-fis-purple">
          <Close />
        </button>
      </div>
      <div className="flex flex-col bg-slate-100 gap-fis-1 p-4 h-[calc(100vh-80px)] overflow-auto">
        <TopBar openSearch={openSearch} />
        <MenuLayer
          isMobile
          menu={menu}
          className="flex-col !gap-2 items-start relative !z-[1000]"
        />
      </div>
    </div>
  );
};

// TODO: get data for top nav
export default function Header() {
  const { pathname } = useRouter();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  useEffect(() => {
    function openSearch() {
      setIsSearchActive(true);
    }
    document.addEventListener("opensearch", openSearch);
    return () => {
      document.removeEventListener("opensearch", openSearch);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuActive) {
      setIsMobileMenuActive(false);
    }
  }, [pathname, setIsMobileMenuActive]);

  return (
    <>
      <header className="flex justify-center h-[80px] lg:h-[100px] p-4 sticky top-0 left-0 bg-white relative z-[1000]">
        <div className="container w-full flex items-center justify-between">
          <Link href="/" className="h-full flex justify-center items-center">
            <Logo
              dimensions={{ width: 200, height: 57 }}
              className="h-auto w-full max-w-[200px]"
            />
          </Link>
          <div></div>
          <div className="flex lg:hidden">
            <button
              onClick={() => {
                setIsMobileMenuActive(true);
              }}
              className="text-fis-purple"
            >
              <Hamburger />
            </button>
          </div>
          <div className="hidden lg:flex flex-col gap-4">
            <TopBar
              openSearch={() => {
                document.dispatchEvent(new CustomEvent("opensearch"));
              }}
            />
            <MenuLayer menu={menu} />
          </div>
        </div>
      </header>
      {isMobileMenuActive && (
        <MobileMenu
          openSearch={() => {
            document.dispatchEvent(new CustomEvent("opensearch"));
          }}
          onClose={() => setIsMobileMenuActive(false)}
        />
      )}
      {isSearchActive && (
        <SearchModal onClose={() => setIsSearchActive(false)} />
      )}
    </>
  );
}
