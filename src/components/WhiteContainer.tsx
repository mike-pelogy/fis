import classNames from "classnames";
import React, { PropsWithChildren } from "react";

const bgBeforeClass =
  "relative before:content-[''] before:absolute before:w-full before:h-full before:bottom-0 before:left-0 before:bg-white/75 before:rounded-lg";

export default function WhiteContainer({ children }: PropsWithChildren) {
  return (
    <div className={classNames("p-4 md:p-fis-1 relative z-10", bgBeforeClass)}>
      <section className="p-4 md:p-fis-1 bg-white rounded-lg relative">
        {children}
      </section>
    </div>
  );
}
