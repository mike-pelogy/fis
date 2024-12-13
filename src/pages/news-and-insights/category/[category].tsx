import type { InferGetStaticPropsType, GetStaticPaths } from "next";
import { NextPageWithLayout } from "../../_app";
import { Cat, normalizePosts, subLayout } from "..";
import getGqlRequest from "@/data/getGqlRequest";
import { catIdQuery, newsInsightsQuery } from "@/data/newsInsightsPosts";

interface IParams {
  params: {
    category: string;
  };
}

export const getStaticPaths = (async () => {
  // TODO: get all the categories from wordpress
  const posts: IParams[] = [
    { uri: "tips" },
    { uri: "articles" },
    { uri: "videos" },
    { uri: "faith-retirement" },
  ].map(({ uri }) => ({
    params: { category: uri },
  }));

  return {
    paths: posts,
    fallback: false,
  };
}) satisfies GetStaticPaths;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ params }: { params: any }) => {
  const { category } = params || {};

  if (!category) {
    return {
      notFound: true,
    };
  }

  const slug = "research";
  const { data: catData } = await getGqlRequest(catIdQuery, {
    slug,
  });
  const id = catData.categories.edges.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ({ node }: { node: any }) => node.databaseId
  )[0];

  const { data } = await getGqlRequest(newsInsightsQuery, {
    categoryId: id,
  });
  const posts = normalizePosts(data);

  return {
    props: {
      posts,
      hasNextPage: !!data.posts.pageInfo.hasNextPage,
      categoryId: id,
      slug,
    },
  };
};

const CategoryPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ slug, posts, categoryId, hasNextPage }) => {
  const getSectionHeader = () => {
    if (slug === "faith-retirement") {
      return (
        <div className="mb-4">
          <div className="bg-slate-500 w-[100px] aspect-video rounded" />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {getSectionHeader()}
      <Cat posts={posts} catId={categoryId} hasNextPage={hasNextPage} />
    </>
  );
};

CategoryPage.getSubLayout = subLayout;

export default CategoryPage;
