import React from 'react';
import classNames from "classnames";

const Skeleton = ({ className }: { className: string }) => {
  return (
    <div
      className={classNames(
        "animate-pulse bg-slate-100 dark:bg-slate-200 rounded-lg",
        className
      )}
    />
  );
};

export default function EtfSkeleton () {
  return (
    <div className="container pb-fis-4">
      <div className="flex gap-4 pt-fis-1 pb-fis-1">
        <Skeleton className="w-[100px] h-[1.5rem]" />
        <Skeleton className="w-[100px] h-[1.5rem]" />
        <Skeleton className="w-[100px] h-[1.5rem]" />
        <Skeleton className="w-[100px] h-[1.5rem]" />
        <Skeleton className="w-[100px] h-[1.5rem]" />
      </div>
      <div>
        <div className="flex">
          <div className="w-2/3">
            <Skeleton className="w-[300px] h-[2rem] mb-4" />
            <Skeleton className="w-[250px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[225px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[200px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[250px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[225px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[200px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[250px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[225px] h-[1.5rem] mb-2" />
            <Skeleton className="w-[200px] h-[1.5rem] mb-2" />
          </div>
          <div className="w-1/3 p-fis-1">
            <div className="flex justify-between mb-4">
              <Skeleton className="w-[150px] h-[1.5rem]" />
              <Skeleton className="w-[120px] h-[1.5rem]" />
            </div>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-[120px] h-[1.5rem]" />
              <Skeleton className="w-[120px] h-[1.5rem]" />
            </div>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-[110px] h-[1.5rem]" />
              <Skeleton className="w-[110px] h-[1.5rem]" />
            </div>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-[100px] h-[1.5rem]" />
              <Skeleton className="w-[100px] h-[1.5rem]" />
            </div>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-[120px] h-[1.5rem]" />
              <Skeleton className="w-[120px] h-[1.5rem]" />
            </div>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-[110px] h-[1.5rem]" />
              <Skeleton className="w-[110px] h-[1.5rem]" />
            </div>
            <div className="flex justify-between mb-2">
              <Skeleton className="w-[100px] h-[1.5rem]" />
              <Skeleton className="w-[100px] h-[1.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
