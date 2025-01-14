import Button from "@/components/Button";
import FunBackground from "@/components/FunBackground";
import { NavBar } from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import WhiteContainer from "@/components/WhiteContainer";
import Plus from "@/svgs/Plus";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useState } from "react";
import Search from "@/svgs/Search";
import getGqlRequest from "@/data/getGqlRequest";
import {
  moreNewsInsightsQuery,
  newsInsightsQuery,
} from "@/data/newsInsightsPosts";
import { Post } from "@/gql/graphql";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";

interface PostWithCursor extends Post {
  cursor?: string;
}

// eslint-disable-next-line
export const normalizePosts = (data: any) => {
  return (data?.posts?.edges || []).map(
    // eslint-disable-next-line
    ({ node, cursor }: { node: any; cursor?: string }) => ({
      ...node,
      cursor: cursor || null,
    })
  ) as PostWithCursor[];
};

const DEFAULT_ID = 4;

export async function getStaticProps() {
  const catId = DEFAULT_ID;

  const { data } = await getGqlRequest(newsInsightsQuery, {
    categoryId: catId,
  });
  const posts = normalizePosts(data);

  return {
    props: {
      posts,
      hasNextPage: !!data.posts.pageInfo.hasNextPage,
      categoryId: catId,
    },
  };
}

const navBar = [
  {
    title: "Faith & Retirement",
    href: "/news-and-insights/category/faith-retirement",
  },
  { title: "Articles", href: "/news-and-insights/category/articles" },
  { title: "Videos", href: "/news-and-insights/category/videos" },
];

export const Cat = ({
  catId,
  posts,
  hasNextPage,
}: {
  catId: number;
  posts?: PostWithCursor[];
  hasNextPage: boolean;
}) => {
  const [additionalPosts, setAdditionalPosts] = useState<PostWithCursor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [canLoadMore, setCanLoadMore] = useState(hasNextPage);

  const handleOnClick = async () => {
    setIsLoading(true);

    const arr = additionalPosts.length ? additionalPosts : posts;

    if (arr) {
      const { data } = await getGqlRequest(moreNewsInsightsQuery, {
        after: arr[arr.length - 1].cursor,
        categoryId: catId,
      }).finally(() => {
        setIsLoading(false);
      });
      setAdditionalPosts((prev) => [...prev, ...normalizePosts(data)]);
      setCanLoadMore(!!data.posts.pageInfo.hasNextPage);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        {!!posts?.length && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {posts.slice(0, 1).map((post) => {
              return <PostCard key={post.slug} post={post} showImage />;
            })}
            {posts.slice(1, 2).map((post) => {
              return <PostCard key={post.slug} post={post} showImage />;
            })}
            <div className="grid md:grid-rows-3 gap-8">
              {posts.slice(2).map((post) => {
                return <PostCard key={post.slug} post={post} />;
              })}
            </div>
          </div>
        )}
        {!!additionalPosts.length && (
          <div className="grid grid-rows-3 grid-cols-3 gap-8">
            {additionalPosts?.map((post) => {
              return <PostCard key={post.slug} post={post} />;
            })}
          </div>
        )}
      </div>
      {!!posts?.length && canLoadMore && (
        <div className="flex justify-center mt-fis-1 gap-4">
          <Button
            variant="tertiary"
            onClick={handleOnClick}
            disabled={isLoading}
            IconButton={<Plus />}
          >
            {isLoading ? "Loading more" : "Load more"}
          </Button>
        </div>
      )}
      {!posts?.length && (
        <div className="my-fis-2">
          <p>No items found</p>
        </div>
      )}
    </>
  );
};

const NewsAndInsightsPage: NextPageWithLayout<{
  posts: PostWithCursor[];
  categoryId: number;
  hasNextPage: boolean;
}> = ({ posts, categoryId, hasNextPage }) => {
  return (
    <>
      <Head>
        <title>{buildPageTitle("News and Insights")}</title>
      </Head>
      <Cat
        key={categoryId}
        catId={categoryId}
        posts={posts}
        hasNextPage={hasNextPage}
      />
    </>
  );
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
                  className="relative mr-0 ml-auto md:ml-0 block px-4 md:px-0 md:absolute md:right-4 md:top-fis-1 h-[38px] text-fis-blue hover:text-fis-purple transition-all"
                  onClick={() => {
                    document.dispatchEvent(new CustomEvent("opensearch"));
                  }}
                >
                  <Search />
                </button>
                <NavBar navBar={navBar} className="pt-0 md:pt-fis-1" />
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
