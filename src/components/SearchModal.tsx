import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Close from "@/svgs/Close";
import TextField from "./Forms/TextField";

const bg =
  "before:content-[''] before:absolute before:w-full before:h-full before:bg-white before:opacity-100 md:before:opacity-80 before:rounded-lg before:left-0 before:right-0";

interface ISearchResult {
  title: string;
  link: string;
  type: string;
}

export function useHtmlOverflow() {
  useEffect(() => {
    const htmlTag = document.getElementsByTagName("html");
    htmlTag[0].classList.add("overflow-hidden");

    return () => {
      htmlTag[0].classList.remove("overflow-hidden");
    };
  }, []);
}

export default function SearchModal({ onClose }: {onClose: () => void}) {
  useHtmlOverflow();

  const [searchVal, setSearchVal] = useState("");
  const [results, setResults] = useState<ISearchResult[]>([]);

  useEffect(() => {
    // TODO: query for results and show them
    if (searchVal) {
      setResults([
        { title: "the title", link: "/", type: "Post" },
        { title: "the secondtitle", link: "/", type: "Post" },
        { title: "thethird title", link: "/", type: "Page" },
        { title: "the fourth title", link: "/", type: "Page" },
      ]);
    } else {
      setResults([]);
    }
  }, [searchVal]);

  const finalResults = results.reduce((acc, item) => {
    const found = acc.find(({ section }) => section === item.type);
    if (!found) {
      acc.push({ section: item.type, children: [item] });
    } else {
      found.children.push(item);
    }
    return acc;
  }, [] as { section: string; children: ISearchResult[] }[]);

  return (
    <div
      className={classNames(
        "fixed w-full h-full top-0 left-0 z-[100000] flex justify-center items-start",
        bg
      )}
    >
      <div className="px-4 md:px-0 w-full flex justify-center">
      <div className="absolute top-0 right-0">
        <button
          onClick={onClose}
          className="p-4 md:p-fis-1 text-fis-purple hover:text-fis-blue transition-all"
        >
          <Close />
        </button>
      </div>
      <div className="max-w-[450px] mt-fis-4 w-full p-fis-1 bg-slate-50 relative rounded-lg shadow-2xl">
        <TextField
          type="text"
          name="search"
          label="Search:"
          onChange={setSearchVal}
        />
        <div className="mt-fis-1 flex flex-col gap-4">
          {!!finalResults.length &&
            finalResults.map(({ section, children }) => (
              <div key={section}>
                <div className="text-sm mb-2 text-slate-500">{section}</div>
                <div className="flex flex-col gap-2">
                  {children.map(({ link, title }) => (
                    <Link
                      key={link}
                      href={link}
                      onClick={onClose}
                      className="text-base font-bold text-fis-purple hover:text-fis-blue transition-all"
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          {!finalResults.length && (
            <div className="text-sm text-slate-500">
              Start typing to search...
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
