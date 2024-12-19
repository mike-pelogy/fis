import Button from "@/components/Button";
import Facebook from "@/svgs/Facebook";
import Linkedin from "@/svgs/Linkedin";
import Twitter from "@/svgs/Twitter";
import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticProps,
} from "next";
import Link from "next/link";
import { SubscribeSection } from "../contact";
import Plus from "@/svgs/Plus";
import Search from "@/svgs/Search";
import Mail from "@/svgs/Mail";
import classNames from "classnames";
import getGqlRequest from "@/data/getGqlRequest";
import { postsQuery } from "@/data/postsQuery";
import type { Post } from "@/gql/graphql";
import { postQuery } from "@/data/postQuery";
import { relatedPostsQuery } from "@/data/relatedPostsQuery";
import { useState } from "react";
import Image from "next/image";
import formatDate from "@/utils/formatDate";
import { BASE_URL } from "@/constants";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";

interface ICategory {
  label: string;
  url: string;
}

interface IAuthorProps {
  name: string;
  img: string;
}

export const getStaticPaths = (async () => {
  const { data } = await getGqlRequest(postsQuery);

  // eslint-disable-next-line
  const posts = data.posts.edges.map(({ node }: { node: any }) => {
    return {
      slug: node.slug,
    };
  });

  return {
    paths: posts.map(({ slug }: { slug: string }) => ({
      params: { postId: slug },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;

// eslint-disable-next-line
const normalizeRelatedPosts = (data: any) => {
  // eslint-disable-next-line
  return data.posts.edges.map((e: any) => {
    const node = e.node as Post;

    const { title, slug } = node;

    return {
      title,
      url: slug,
      cursor: e.cursor,
    };
  });
};

// eslint-disable-next-line
export const getStaticProps: GetStaticProps<any, { postId?: string }> = async ({
  params,
}) => {
  const { postId } = params || {};

  if (!postId) {
    return {
      notFound: true,
    };
  }

  const { data } = await getGqlRequest(postQuery, { slug: postId });

  const postBy = data.postBy as Post;
  const {
    title,
    categories: catEdges,
    content,
    author,
    slug,
    date,
    databaseId,
  } = postBy;

  const categories = catEdges?.edges.map(({ node }) => {
    return {
      label: node.name || "",
      url: node.slug || "",
    };
  });

  const authorDone = {
    name: author?.node.name || "",
    img: author?.node.avatar?.url || "",
  };

  const { data: relatedData } = await getGqlRequest(relatedPostsQuery, {
    notIn: [databaseId],
  });
  const relatedPosts = normalizeRelatedPosts(relatedData);

  return {
    props: {
      id: databaseId,
      title,
      content,
      url: slug,
      author: authorDone,
      date: formatDate(new Date(date || "")),
      categories,
      relatedPosts,
    },
  };
};

const Categories = ({ categories }: { categories: ICategory[] }) => {
  if (!categories.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(({ label, url }) => {
        const href = `/news-and-insights/category/${url}`;
        return (
          <Button key={url} variant="tertiary" size="small" href={href}>
            {label}
          </Button>
        );
      })}
    </div>
  );
};

const Author = ({ name, img }: IAuthorProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-[100%] border-[1px] w-[50px] aspect-square overflow-hidden">
        <Image src={img} width={50} height={50} alt={name} />
      </div>
      <p className="text-lg">{name}</p>
    </div>
  );
};

const aClass = "text-fis-purple hover:text-fis-blue transition-all";

const createPostShareUrl = (url: string) => {
  return `${BASE_URL}/news-and-insights/${url}`;
};

const Share = ({ url: propsUrl }: { url: string }) => {
  const url = createPostShareUrl(propsUrl);

  return (
    <div className="flex items-center gap-4">
      <span className="text-slate-600">Share:</span>
      <div className="flex items-center gap-6">
        <a
          className={classNames(aClass, "text-2xl")}
          href={`mailto:?subject=Shared%20from%20Faith%20Investors%20Services&body=${url}`}
        >
          <Mail width="24px" height="24px" />
        </a>
        <a
          className={aClass}
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </a>
        <a
          className={aClass}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Linkedin />
        </a>
        <a
          className={aClass}
          href={`https://twitter.com/intent/tweet?text=undefined&url=${url}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Twitter />
        </a>
      </div>
    </div>
  );
};

export default function Post({
  title,
  content,
  url,
  author,
  date,
  categories,
  relatedPosts,
  id,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [moreRelatedPosts, setMoreRelatedPosts] = useState([]);
  const [loadingMoreRelatedPosts, setLoadingMoreRelatedPosts] = useState(false);

  const handleLoadMore = async () => {
    setLoadingMoreRelatedPosts(true);

    const { data: relatedData } = await getGqlRequest(relatedPostsQuery, {
      notIn: [id],
      after: relatedPosts[relatedPosts.length - 1].cursor,
    }).finally(() => {
      setLoadingMoreRelatedPosts(false);
    });

    setMoreRelatedPosts(normalizeRelatedPosts(relatedData || []));
  };

  return (
    <>
      <Head>
        <title>{buildPageTitle(title)}</title>
      </Head>
      <div className="flex items-center w-full relative flex-col">
        <section className="container px-4 md:px-fis-2 p-fis-2 flex flex-col w-full relative">
          <h3 className="text-2xl text-fis-blue mb-fis-1 max-w-[700px]">{title}</h3>
          <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <Author {...author} />
              <Categories categories={categories || []} />
              <span className="text-slate-600">{date}</span>
            </div>
            <Share url={url || ""} />
          </div>
          <hr className="mt-4" />
          <div className="flex flex-col md:flex-row pt-fis-2">
            <article className="w-full md:w-2/3 pr-0 md:pr-fis-2">
              <div dangerouslySetInnerHTML={{ __html: content || "" }} />
            </article>
            <aside className="w-full md:w-1/3 flex flex-col pt-fis-2 md:pt-0">
              <div>
                <div className="mb-4 flex gap-2 justify-between items-center">
                  <h4 className="text-2xl text-fis-blue">More news</h4>
                  <button
                    className="text-fis-blue hover:text-fis-purple transition-all"
                    onClick={() => {
                      document.dispatchEvent(new CustomEvent("opensearch"));
                    }}
                  >
                    <Search />
                  </button>
                </div>
                <ul className="flex flex-col gap-4">
                  {relatedPosts.map(
                    ({ title, url }: { title: string; url: string }) => (
                      <li key={url}>
                        <Link
                          className="text-xl font-bold hover:text-fis-purple transition-all"
                          href={url}
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  )}
                  {moreRelatedPosts.map(
                    ({ title, url }: { title: string; url: string }) => (
                      <li key={url}>
                        <Link
                          className="text-xl font-bold hover:text-fis-purple transition-all"
                          href={url}
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
                {!moreRelatedPosts.length && (
                  <Button
                    variant="tertiary"
                    onClick={handleLoadMore}
                    className="mt-fis-1"
                    IconButton={<Plus />}
                    disabled={loadingMoreRelatedPosts}
                  >
                    {loadingMoreRelatedPosts ? "Loading" : "See More"}
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
      <div className="w-full bg-slate-100 pb-fis-2">
        <SubscribeSection />
      </div>
    </>
  );
}
