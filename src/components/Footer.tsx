import React, { useEffect, useState } from "react";
import Menu, { beforeClass } from "./Menu";
import { FormAndADV, menu, SocialAndPhone } from "./Header";
import classNames from "classnames";
import Logo from "./Logo";
import Link from "next/link";

const borderTopClass =
  "relative before:content-[''] before:absolute before:w-[calc(100%-2rem)] before:h-[2px] before:top-0 before:left-[50%] before:translate-x-[-50%] before:bg-fis-purple";

const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--blue)/0.1)_0%,rgba(256,256,256,1)_60%)]";

export default function Footer() {
  const [date, setDate] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const date = new Date().getFullYear();
    setDate(date);
  }, []);

  return (
    <div
      className={classNames("flex justify-center", borderTopClass, radialBg)}
    >
      <footer className="flex container py-[60px]">
        <div className="flex flex-col gap-4 w-1/3">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex gap-4 items-center">
            <SocialAndPhone />
          </div>
          <div className="flex flex-col gap-1 items-start">
          <div className="flex gap-4">
            <FormAndADV color="text-black" />
          </div>
            <Link
              href="/privacy-policy"
              className={classNames(
                beforeClass,
                "text-black hover:text-fis-blue transition-all"
              )}
            >
              Privacy Policy
            </Link>
          </div>
          <div>
            <p className="font-bold text-sm">
              © {date} Faith Investor Services, LLC.
            </p>
            <p className="font-bold text-sm">
              All rights reserved.
            </p>
          </div>
        </div>
        <div className="w-1/3">
          <Menu
            className="flex-col !gap-2 items-start"
            menu={menu.map(({ title, path }) => ({ title, path }))}
          />
        </div>
        <div className="w-1/3">
          <p className="text-base">
            Investors should consider the investment objectives, risks, charges
            and expenses carefully before investing. A prospectus or summary
            prospectus with this and other information about the Funds can be
            found here, PRAY or KOCG. Read the prospectus or summary prospectus
            carefully before investing.

            Investing in ETFs involves risk and
            there is no guarantee the Funds’ investment strategy will be
            successful and you can lose money on your investment in the fund.
            Shares may trade at a premium or discount to their NAV in the
            secondary market.

            ETFs are Distributed by Foreside Fund Services,
            LLC.
          </p>
        </div>
      </footer>
    </div>
  );
}
