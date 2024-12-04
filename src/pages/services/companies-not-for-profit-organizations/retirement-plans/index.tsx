import FunBackground from "@/components/FunBackground";
import { NavBar } from "@/components/NavBar";
import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import { NextPageWithLayout } from "@/pages/_app";
import request from "graphql-request";
import { ReactElement } from "react";
import { Nav } from "../../individuals/financial-planning";
import { SubscribeSection } from "@/pages/contact";

export async function getStaticProps() {
  const data = await request(API, kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--purple)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const FinancialPlanningPage: NextPageWithLayout = () => {
  return (
    <>
      <div className="flex justify-center relative w-full pt-fis-2 pb-fis-2">
        <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[-1]">
          <FunBackground />
        </div>
        <section className="container px-fis-2 relative">
          <div className="overflow-hidden relative rounded-lg before:content-[''] before:absolute before:w-full before:h-full before:bg-slate-100 before:opacity-95 before:rounded-lg before:left-0 before:right-0">
            <div className="flex p-fis-2 relative">
              <div className="w-1/2 pr-fis-1">
                <p>
                  FIS believes a well-crafted financial plan expresses your most
                  meaningful values and goals. Our process drives to your clear
                  goals and helps focus your actions thus allowing you to
                  proceed with confidence. Life is unpredictable. It is our goal
                  for you to go forward with a sense of confidence. With Faith
                  Investor Services, you have a team of professionals by your
                  side to guide you through life’s challenges and uncover
                  opportunities. We guide you in planning for life’s unexpected
                  events:
                </p>
              </div>
              <div className="w-1/2 pl-fis-1">
                <p>
                  FIS believes a well-crafted financial plan expresses your most
                  meaningful values and goals. Our process drives to your clear
                  goals and helps focus your actions thus allowing you to
                  proceed with confidence. Life is unpredictable. It is our goal
                  for you to go forward with a sense of confidence. With Faith
                  Investor Services, you have a team of professionals by your
                  side to guide you through life’s challenges and uncover
                  opportunities. We guide you in planning for life’s unexpected
                  events:
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container p-fis-2">
        <div className="w-1/2 pr-fis-2 mb-4">
          <p>this is a test</p>
        </div>
        <div className="flex">
          <div className="w-1/2 pr-fis-2">
            <p>
              FIS believes a well-crafted financial plan expresses your most
              meaningful values and goals. Our process drives to your clear
              goals and helps focus your actions thus allowing you to proceed
              with confidence. Life is unpredictable. It is our goal for you to
              go forward with a sense of confidence. With Faith Investor
              Services, you have a team of professionals by your side to guide
              you through life’s challenges and uncover opportunities. We guide
              you in planning for life’s unexpected events:
            </p>
          </div>
          <div className="w-1/2">
            <div className="bg-slate-500 rounded-lg w-full aspect-video" />
          </div>
        </div>
      </section>
      <div className="w-full bg-slate-100 pb-fis-2">
        <SubscribeSection />
      </div>
    </>
  );
};

export const subLayout = (page: ReactElement) => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="w-full bg-slate-100 flex justify-center">
        <div className="container w-full">
          <Nav />
        </div>
      </div>
      <div className="container w-full">
        <NavBar
          className="!pb-0"
          navBar={[
            {
              title: "Retirement Plans",
              href: "/services/companies-not-for-profit-organizations/retirement-plans",
            },
            {
              title: "Endowments",
              href: "/services/companies-not-for-profit-organizations/endowments",
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-col items-center">{page}</div>
    </div>
  );
};

FinancialPlanningPage.getSubLayout = subLayout;

export default FinancialPlanningPage;
