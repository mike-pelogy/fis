import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Close from "@/svgs/Close";
import TextField from "./Forms/TextField";
import getGqlRequest from "@/data/getGqlRequest";
import { searchPages, searchPosts, searchTeams } from "@/data/searchQuery";
import { Page, Post, Team } from "@/gql/graphql";
import { debounce } from "lodash";
import { useHtmlOverflow } from "@/hooks/useHtmlOverflow";

const bg =
  "before:content-[''] before:absolute before:w-full before:h-full before:bg-white before:opacity-100 md:before:opacity-80 before:rounded-lg before:left-0 before:right-0";

interface ISearchResult {
  title: string;
  link: string;
  type: string;
}

export default function SearchModal({ onClose }: { onClose: () => void }) {
  useHtmlOverflow();

  const [searchVal, setSearchVal] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ISearchResult[]>([]);

  useEffect(() => {
    if (searchVal && searchVal.length > 2) {
      setIsSearching(true);
      const search = async (search: string) => {
        const [postsP, pagesP, teamsP] = await Promise.allSettled([
          getGqlRequest(searchPosts, { search }),
          getGqlRequest(searchPages, { search }),
          getGqlRequest(searchTeams, { search }),
        ]);

        let final: { link: string; title: string; type: string }[] = [];
        if (pagesP.status === "fulfilled") {
          const pages = pagesP.value.data.pages.edges.map(
            ({ node }: { node: Page }) => {
              return {
                link: node.uri,
                title: node.title,
                type: "Page",
              };
            }
          );

          final = [...final, ...pages];
        }
        if (teamsP.status === "fulfilled") {
          const teams = teamsP.value.data.teams.edges.map(
            ({ node }: { node: Team }) => {
              return {
                link: `/team/${node.slug}`,
                title: node.title,
                type: "Team",
              };
            }
          );

          final = [...final, ...teams];
        }
        if (postsP.status === "fulfilled") {
          const posts = postsP.value.data.posts.edges.map(
            ({ node }: { node: Post }) => {
              return {
                link: `/news-and-insights/${node.slug}`,
                title: node.title,
                type: "Post",
              };
            }
          );

          final = [...final, ...posts];
        }

        setResults(final);
        setIsSearching(false);
      };

      const debouncedSearch = debounce(search, 500);

      debouncedSearch(searchVal);
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
        "fixed w-full h-full top-0 left-0 z-[10000000000] flex justify-center items-start",
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
          <div className="mt-fis-1 flex flex-col gap-4 max-h-[50vh] overflow-auto">
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
            {isSearching && (
              <div className="text-sm text-slate-500">Searching...</div>
            )}
            {!finalResults.length && searchVal.length > 3 && !isSearching && (
              <div className="text-sm text-slate-500">No results found.</div>
            )}
            {!finalResults.length &&
              !(searchVal.length > 3) &&
              !isSearching && (
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
