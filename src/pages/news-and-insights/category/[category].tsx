import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import { NextPageWithLayout } from "../../_app";
import { Cat, dummyPosts, subLayout } from "..";

interface IParams {
  params: {
    category: string;
  };
}

export const getStaticPaths = (async () => {
  // TODO: get all the posts from wordpress
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

export const getStaticProps = (async ({ params }) => {
  const { category } = params || {};

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: "this is the title",
      posts: [
        { title: "test title 1", url: "#" },
        { title: "test title 2", url: "#" },
        { title: "test title 3", url: "#" },
      ],
    },
  };
}) satisfies GetStaticProps<{
  title: string;
  posts?: { title: string; url: string }[];
}>;

const CategoryPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, posts }) => {
  console.log(posts);
  const getSectionHeader = () => {
    if (title === "faith-retirement") {
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
      <Cat posts={dummyPosts} />
    </>
  );
};

CategoryPage.getSubLayout = subLayout;

export default CategoryPage;
