import React, { useEffect, useState } from "react";
import { MenuLayer } from "./Menu";
import type { IMenuItem } from "./Menu";
import Logo from "./Logo";
import Link from "next/link";
import Search from "@/svgs/Search";
import SearchModal from "./SearchModal";
import Hamburger from "@/svgs/Hamburger";
import Close from "@/svgs/Close";
import { useRouter } from "next/router";
import { useHtmlOverflow } from "@/hooks/useHtmlOverflow";
import FormAndADV from "./FormAndADV";
import SocialAndPhone from "./SocialAndPhone";

export const menu: IMenuItem[] = [
  { title: "Home", path: "/" },
  {
    title: "Wealth Management",
    path: "/wealth-management",
    children: [
      {
        title: "Individuals",
        path: "/wealth-management/individuals/financial-planning",
        children: [
          {
            title: "Financial Planning",
            path: "/wealth-management/individuals/financial-planning",
          },
          {
            title: "Investment Management",
            path: "/wealth-management/individuals/investment-management",
          },
        ],
      },
      {
        title: "Companies not for profit organizations",
        path: "/wealth-management/companies-not-for-profit-organizations/retirement-plans",
        children: [
          {
            title: "Retirement Plans",
            path: "/wealth-management/companies-not-for-profit-organizations/retirement-plans",
          },
          {
            title: "Endowments",
            path: "/wealth-management/companies-not-for-profit-organizations/endowments",
          },
        ],
      },
      {
        title: "Separately Managed Accounts (SMA)",
        path: "/wealth-management/separately-managed-accounts",
      },
    ],
  },
  {
    title: "ETFs",
    path: "/etfs/pray",
    children: [
      { title: "PRAY", path: "/etfs/pray" },
      { title: "KOCG", path: "/etfs/kocg" },
      { title: "BRIF", path: "/etfs/brif" },
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
  {
    title: "News and Insights",
    path: "/news-and-insights/category/faith-retirement",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

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
