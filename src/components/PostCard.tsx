import React from "react";
import Button from "./Button";
import Link from "next/link";
import classNames from "classnames";
import Plus from "@/svgs/Plus";
import { Post } from "@/gql/graphql";
import formatDate from "@/utils/formatDate";
import Image from "next/image";

interface IPostCardProps {
  post: Post;
  className?: string;
  showButton?: boolean;
  showImage?: boolean;
}

const getDefaultImage = (post: Post) => {
  return post.categories?.edges.find((p) => p.node.slug === "faith-retirement")
    ? "/Faith-Retirement-default.jpg"
    : "/defaultFeaturedImage.png";
};

export default function PostCard({
  post,
  className,
  showButton,
  showImage,
}: IPostCardProps) {
  const { categories, title, slug, date, featuredImage } = post;

  const image = featuredImage?.node.mediaItemUrl || getDefaultImage(post);

  return (
    <article className={className}>
      <Link
        href={`/news-and-insights/${slug}`}
        draggable
        onDragStart={(e) => e.preventDefault()}
        className="hover:text-fis-purple transition-all"
      >
        {showImage && (
          <Image
            src={image}
            width={1200}
            height={690}
            className="w-full aspect-video rounded-lg object-cover"
            alt={title || "Post featured image"}
          />
        )}
        <h3 className={classNames("text-lg font-bold ", { "mt-4": showImage })}>
          {title}
        </h3>
      </Link>
      <div
        className={classNames("flex justify-between items-center mt-2 gap-2", {
          "mb-4": showButton,
        })}
      >
        <p className="text-sm text-slate-500 mb-0">
          {formatDate(new Date(date || ""))}
        </p>
        <div className="flex gap-1">
          {categories?.edges.map(({ node }) => (
            <Button
              key={node.slug}
              variant="neutral"
              size="small"
              href={`/news-and-insights/category/${node.slug}`}
            >
              {node.name}
            </Button>
          ))}
        </div>
      </div>
      {showButton && (
        <Button
          href={`/news-and-insights/${slug}`}
          variant="secondary"
          IconButton={<Plus />}
        >
          Read more
        </Button>
      )}
    </article>
  );
}
