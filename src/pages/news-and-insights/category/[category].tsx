import type { InferGetStaticPropsType, GetStaticPaths } from "next";
import { NextPageWithLayout } from "../../_app";
import { Cat, normalizePosts, subLayout } from "..";
import getGqlRequest from "@/data/getGqlRequest";
import { catIdQuery, newsInsightsQuery } from "@/data/newsInsightsPosts";
import { categoriesQuery } from "@/data/categoriesQuery";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import Image from "next/image";

export const getStaticPaths = (async () => {
  const { data } = await getGqlRequest(categoriesQuery);

  // eslint-disable-next-line
  const paths = data.categories.edges.map(({ node }: { node: any }) => {
    return {
      params: { category: node.slug },
    };
  });

  return {
    paths,
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

  const { data: catData } = await getGqlRequest(catIdQuery, {
    id: category,
  });
  const catId = catData.category.databaseId;

  const { data } = await getGqlRequest(newsInsightsQuery, {
    categoryId: catId,
  });
  const posts = normalizePosts(data);

  return {
    props: {
      posts,
      hasNextPage: !!data.posts.pageInfo.hasNextPage,
      categoryId: catId || "",
      slug: category,
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
          <Image
            alt=""
            src="/faith and retirement sirius-1.png 1.png"
            width={130}
            height={44}
            className="w-[130px]"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Head>
        <title>{buildPageTitle("News and Insights")}</title>
      </Head>
      {getSectionHeader()}
      <Cat
        key={categoryId}
        posts={posts}
        catId={categoryId}
        hasNextPage={hasNextPage}
      />
    </>
  );
};

CategoryPage.getSubLayout = subLayout;

export default CategoryPage;
