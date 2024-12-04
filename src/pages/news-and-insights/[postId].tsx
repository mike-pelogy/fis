import Button from "@/components/Button";
import Facebook from "@/svgs/Facebook";
import Linkedin from "@/svgs/Linkedin";
import Twitter from "@/svgs/Twitter";
import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import Link from "next/link";
import { SubscribeSection } from "../contact";

interface ICategory {
  label: string;
  url: string;
}

interface IAuthorProps {
  name: string;
  img: string;
}

interface IParams {
  params: {
    postId: string;
  };
}

export const getStaticPaths = (async () => {
  // TODO: get all the posts from wordpress
  const posts: IParams[] = [
    { uri: "post-tester" },
    { uri: "post-tester-2" },
    { uri: "post-tester-3" },
    { uri: "post-tester-4" },
  ].map(({ uri }) => ({
    params: { postId: uri },
  }));

  return {
    paths: posts,
    fallback: false,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const { postId } = params || {};

  if (!postId) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: "this is the title",
      content:
        "ttthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the conten this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contenttthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the conten this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contenttthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the conten this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contenttthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the conten this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the conten this is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the contentthis is the content",
      url: "url",
      author: {
        name: "author name",
        img: "#",
      },
      date: Date.now().toString(),
      categories: [
        { label: "Articles", url: "/news-and-insights" },
        { label: "Test", url: "/news-and-insights" },
      ],
      relatedPosts: [
        { title: "test title 1", url: "#" },
        { title: "test title 2", url: "#" },
        { title: "test title 3", url: "#" },
      ],
    },
  };
}) satisfies GetStaticProps<{
  title: string;
  content: string;
  author: IAuthorProps;
  date: string;
  url: string;
  categories?: ICategory[];
  relatedPosts?: { title: string; url: string }[];
}>;

const Categories = ({ categories }: { categories: ICategory[] }) => {
  if (!categories.length) return null;

  return (
    <div className="flex gap-2">
      {categories.map(({ label, url }) => {
        return (
          <Button key={url} variant="tertiary" size="small" href={url}>
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
      <div className="rounded-[100%] border-[1px] border-slate-200 w-[50px] aspect-square bg-slate-100" />
      <p className="text-lg">{name}</p>
    </div>
  );
};

const aClass = "text-fis-purple hover:text-fis-blue transition-all";

const Share = ({ url }: { url: string }) => {
  return (
    <div className="flex items-center gap-4">
      <p className="text-slate-600">Share:</p>
      <div className="flex items-center gap-6">
        <a
          className={aClass}
          href={`mailto:?subject=Shared%20from%20Faith%20Investors%20Services&body=${url}`}
        >
          Mail
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log({ url });
  return (
    <>
      <div className="flex items-center w-full relative flex-col">
        <section className="container p-fis-2 flex flex-col w-full relative">
          <h3 className="text-2xl text-fis-blue mb-fis-1">{title}</h3>
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-4">
              <Author {...author} />
              <Categories categories={categories} />
              <p className="text-slate-600">{date}</p>
            </div>
            <Share url={url} />
          </div>
          <hr className="mt-4" />
          <div className="flex pt-fis-2">
            <article className="w-2/3 pr-fis-2">{content}</article>
            <aside className="w-1/3 flex flex-col">
              <div></div>
              <div>
                <h4 className="text-2xl mb-4 text-fis-blue">More news</h4>
                <ul className="flex flex-col gap-4">
                  {relatedPosts.map(({ title, url }) => (
                    <li key={url}>
                      <Link
                        className="text-xl font-bold hover:text-fis-purple transition-all"
                        href={url}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button variant="tertiary" href="#" className="mt-fis-1">
                  See More
                </Button>
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
