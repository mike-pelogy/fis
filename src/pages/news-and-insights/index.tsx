import Button from "@/components/Button";
import FunBackground from "@/components/FunBackground";
import { NavBar } from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import WhiteContainer from "@/components/WhiteContainer";
import { API } from "@/constants";
import { aboutPageQuery } from "@/data/aboutPageQuery";
import { Page_Aboutpage } from "@/gql/graphql";
import Plus from "@/svgs/Plus";
import request from "graphql-request";
import { NextPageWithLayout } from "../_app";
import { ReactElement } from "react";
import Search from "@/svgs/Search";

export async function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await request(API, aboutPageQuery);

  return {
    props: {
      data: data.page.aboutPage as Page_Aboutpage,
    },
  };
}

const navBar = [
  { title: "Tips", href: "/news-and-insights/category/tips" },
  { title: "Articles", href: "/news-and-insights/category/articles" },
  { title: "Videos", href: "/news-and-insights/category/videos" },
  {
    title: "Faith & Retirement",
    href: "/news-and-insights/category/faith-retirement",
  },
];

interface IDummyPost {
  categories?: { label: string; path: string }[];
  img: string;
  title: string;
  date: string;
  url: string;
}

export const dummyPosts: IDummyPost[] = [
  {
    categories: [],
    img: "image",
    url: "/",
    title:
      "Whether you come to us with an existing portfolio, low-basis/concentrated positions, or with cash proceeds from a business sale or inheritance.",
    date: "Jul 04, 23",
  },
  {
    categories: [],
    img: "image",
    url: "/",
    title:
      "Whether you come to us with an existing portfolio, low-basis/concentrated positions, or with cash proceeds from a business sale or inheritance.",
    date: new Date().getDate().toString(),
  },
  {
    categories: [{ label: "Articles", path: "/" }],
    img: "image",
    url: "/",
    title:
      "Whether you come to us with an existing portfolio, low-basis/concentrated positions, or with cash proceeds from a business sale or inheritance.",
    date: new Date().getDate().toString(),
  },
  {
    categories: [{ label: "Articles", path: "/" }],
    img: "image",
    url: "/",
    title:
      "Whether you come to us with an existing portfolio, low-basis/concentrated positions, or with cash proceeds from a business sale or inheritance.",
    date: new Date().getDate().toString(),
  },
  {
    categories: [{ label: "Articles", path: "/" }],
    img: "image",
    url: "/",
    title:
      "Whether you come to us with an existing portfolio, low-basis/concentrated positions, or with cash proceeds from a business sale or inheritance.",
    date: new Date().getDate().toString(),
  },
];

// TODO: create pagination
export const Cat = ({ cat, posts }: { cat?: string; posts?: IDummyPost[] }) => {
  console.log(cat);
  const page = 1;

  return (
    <>
      {page === 1 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dummyPosts.slice(0, 2).map((post) => {
                return <PostCard key={post.url} post={post} showImage />;
              })}
            </div>
            <div className="grid md:grid-rows-3 gap-8">
              {dummyPosts.slice(2).map((post) => {
                return <PostCard key={post.url} post={post} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-rows-3 grid-cols-3 gap-8">
            {posts?.map((post) => {
              return <PostCard key={post.url} post={post} />;
            })}
          </div>
        </>
      )}
      <div className="flex justify-center mt-fis-1 gap-4">
        <Button variant="tertiary" href="#" IconButton={<Plus />}>
          Load more
        </Button>
      </div>
    </>
  );
};

const NewsAndInsightsPage: NextPageWithLayout = () => {
  return <Cat />;
};

export const subLayout = (page: ReactElement) => {
  return (
    <div className="bg-slate-100 w-full pb-fis-2">
      <div className="flex justify-center relative w-full pt-fis-2">
        <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
          <FunBackground />
        </div>
        <div className="container w-full">
          <WhiteContainer>
            <div className="flex flex-col">
              <div className="mb-fis-1">
                <h3 className="text-fis-blue text-2xl mb-fis-1">
                  Faith-based investing news & insights
                </h3>
                <p className="max-w-[450px]">
                  Explore research and market commentary from Faith Investor
                  Services, including our take on the state of the ETF market
                  and content about faith-based investing.
                </p>
              </div>
              <div className="relative">
                <button
                  className="absolute right-4 top-fis-1 h-[38px] text-fis-blue hover:text-fis-purple transition-all"
                  onClick={() => {
                    document.dispatchEvent(new CustomEvent("opensearch"));
                  }}
                >
                  <Search />
                </button>
                <NavBar navBar={navBar} />
              </div>
              <div>{page}</div>
            </div>
          </WhiteContainer>
        </div>
      </div>
    </div>
  );
};

NewsAndInsightsPage.getSubLayout = subLayout;

export default NewsAndInsightsPage;
