import { Page_Customerfooter } from "@/gql/graphql";
import React, { ReactElement } from "react";

// eslint-disable-next-line
export default function getEtfFooterLayout(page: ReactElement, pageProps: any) {
  const customFooter: Page_Customerfooter = pageProps.customFooter;

  return (
    <>
      {page}
      {customFooter.customFooter && (
        <div className="flex justify-center py-fis-2 bg-slate-100">
          <div className="container px-4 md:px-0">
            <div
              dangerouslySetInnerHTML={{
                __html: customFooter.customFooter || "",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}
