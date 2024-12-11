import React from "react";
import { Page_Homepage_ContactUsCtaSimple } from "@/gql/graphql";
import Button from "./Button";
import classNames from "classnames";
import ArrowRight from "@/svgs/ArrowRight";

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--purple)/0.3)_0%,rgba(256,256,256,1)_70%)]";

const radialBgInner =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--purple)/0.45)_0%,rgba(256,256,256,1)_60%)]";

export default function ConnectWithUs({
  connectWithUs,
}: {
  connectWithUs: Page_Homepage_ContactUsCtaSimple;
}) {
  return (
    <div className={classNames("w-full pt-fis-2", radialBg,
      'bg-[length:50%] bg-no-repeat bg-center',
    )}>
      <section
        className={classNames( "relative w-full max-h-[400px] h-screen flex justify-center items-end overflow-hidden")}
      >
        <div
          className={classNames(
            "absolute top-0 left-[50%] translate-x-[-50%] p-fis-2 rounded-t-[100%] aspect-square bg-slate-200",
            radialBgInner
          )}
        >
          <div className="flex justify-center items-center flex-col mt-fis-2">
            <h2
              className="text-fis-blue text-2xl mb-6"
              dangerouslySetInnerHTML={{
                __html: connectWithUs.title as string,
              }}
            />
            <div
              className="text-base font-bold mb-6 whitespace-nowrap"
              dangerouslySetInnerHTML={{
                __html: connectWithUs.description as string,
              }}
            />
            <Button
              IconButton={<ArrowRight />}
            variant="white" href={connectWithUs.link?.url as string}>
              {connectWithUs.link?.title}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
