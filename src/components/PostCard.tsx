import React from "react";
import Button from "./Button";
import Link from "next/link";
import classNames from "classnames";
import Plus from "@/svgs/Plus";
import { Post } from "@/gql/graphql";
import formatDate from "@/utils/formatDate";

interface IPostCardProps {
  post: Post;
  className?: string;
  showButton?: boolean;
  showImage?: boolean;
}

export default function PostCard({
  post,
  className,
  showButton,
  showImage,
}: IPostCardProps) {
  const { categories, title, slug, featuredImage, date } = post;
  return (
    <article className={className}>
      <Link href={`/news-and-insights/${slug}`} draggable onDragStart={(e) => e.preventDefault()} className="hover:text-fis-purple transition-all">
        {showImage && (
          <div className="rounded-lg w-full aspect-video bg-slate-500" />
        )}
        <h3 className={classNames("text-lg font-bold ", { "mt-4": showImage })}>
          {title}
        </h3>
      </Link>
      <div
        className={classNames("flex justify-between items-center mt-2 ", {
          "mb-4": showButton,
        })}
      >
        <p className="text-sm text-slate-500">{formatDate(new Date(date || ''))}</p>
        {categories?.edges.map(({ node }) => (
          <Button key={node.slug} variant="neutral" size="small" href={`/news-and-insights/category/${node.slug}`}>
            {node.name}
          </Button>
        ))}
      </div>
      {showButton && (
        <Button href={`/news-and-insights/${slug}`} variant="secondary" IconButton={<Plus />}>
          Read more
        </Button>
      )}
    </article>
  );
}
