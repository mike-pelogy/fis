import React, { ReactElement } from "react";
import classNames from "classnames";
import Twitter from "@/svgs/Twitter";
import Linkedin from "@/svgs/Linkedin";
import Facebook from "@/svgs/Facebook";
import Phone from "@/svgs/Phone";

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
  { icon: "facebook", url: "https://www.facebook.com/FaithInvestorServices/" },
  { icon: "linkedin", url: "https://www.linkedin.com/company/faith-investor-services/" },
  { icon: "twitter", url: "https://x.com/fis_etfs" },
];

export default function SocialAndPhone () {
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
        href="tel:+18885861404"
        className={classNames("text-fis-purple hover:text-fis-blue")}
      >
        <span className="inline-block w-[1rem] h-[0.9rem] mr-2">
          <Phone />
        </span>
        888-586-1404
      </a>
    </>
  );
};

