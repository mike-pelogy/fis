import React from "react";
import Button from "./Button";
import Link from "next/link";

interface IPostCardProps {
  post: {
    categories?: { label: string; path: string }[];
    img: string;
    title: string;
    date: string;
    url: string;
  };
  className?: string;
}

export default function PostCard({ post, className }: IPostCardProps) {
  const { categories, title, url, img, date } = post;
  return (
    <article className={className}>
      <Link href={url}>
        <div className="rounded-lg w-full aspect-video bg-slate-500">{img}</div>
        <h3 className="text-lg font-bold mt-4">{title}</h3>
      </Link>
      <div className="flex justify-between items-center mt-2 mb-4">
        <p className="text-sm text-slate-500">{date}</p>
        {categories?.map(({ label, path }) => (
          <Button key={path} variant="neutral" size="small" href={path}>
            {label}
          </Button>
        ))}
      </div>
      <Button href={url} variant="secondary">
        Read more
      </Button>
    </article>
  );
}
