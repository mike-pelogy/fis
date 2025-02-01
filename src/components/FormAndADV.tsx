import React from "react";
import classNames from "classnames";
import ExternalLink from "@/svgs/ExternalLink";

export default function FormAndADV({
  color = "text-fis-purple",
}: {
  color?: string;
}) {
  return (
    <>
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
}
