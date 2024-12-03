import React from "react";
import Button from "./Button";
import Link from "next/link";
import classNames from "classnames";

interface IPostCardProps {
  post: {
    categories?: { label: string; path: string }[];
    img: string;
    title: string;
    date: string;
    url: string;
  };
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
  const { categories, title, url, img, date } = post;
  return (
    <article className={className}>
      <Link href={url} className="hover:text-fis-purple transition-all">
        {showImage && (
          <div className="rounded-lg w-full aspect-video bg-slate-500">
            {img}
          </div>
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
        <p className="text-sm text-slate-500">{date}</p>
        {categories?.map(({ label, path }) => (
          <Button key={path} variant="neutral" size="small" href={path}>
            {label}
          </Button>
        ))}
      </div>
      {showButton && (
        <Button href={url} variant="secondary">
          Read more
        </Button>
      )}
    </article>
  );
}
