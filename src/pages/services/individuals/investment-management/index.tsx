import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import { NextPageWithLayout } from "@/pages/_app";
import classNames from "classnames";
import request from "graphql-request";
import { subLayout } from "../financial-planning";
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

const InvestmentManagementPage: NextPageWithLayout = () => {
  return (
    <>
      <section className={classNames("container px-fis-2 py-fis-2", radialBg)}>
        <div className="flex">
          <div className="w-1/2">
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
        </div>
      </section>
      <div className="w-full py-fis-2 bg-slate-100 flex justify-center">
        <section className="container px-fis-2">
          <div className="flex">
            <div className="w-1/2 pr-fis-2">
              <h3 className="text-2xl text-fis-blue mb-4">Wealth Transition</h3>
              <p>
                FIS believes a well-crafted financial plan expresses your most
                meaningful values and goals. Our process drives to your clear
                goals and helps focus your actions thus allowing you to proceed
                with confidence. Life is unpredictable. It is our goal for you
                to go forward with a sense of confidence. With Faith Investor
                Services, you have a team of professionals by your side to guide
                you through life’s challenges and uncover opportunities. We
                guide you in planning for life’s unexpected events:
              </p>
            </div>
            <div className="w-1/2 pl-fis-2">
              <h3 className="text-2xl text-fis-blue mb-4">
                Investment Philosophy
              </h3>
              <p>
                FIS believes a well-crafted financial plan expresses your most
                meaningful values and goals. Our process drives to your clear
                goals and helps focus your actions thus allowing you to proceed
                with confidence. Life is unpredictable. It is our goal for you
                to go forward with a sense of confidence. With Faith Investor
                Services, you have a team of professionals by your side to guide
                you through life’s challenges and uncover opportunities. We
                guide you in planning for life’s unexpected events:
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="container p-fis-2">
        <div className="flex">
          <div className="w-1/2 pr-fis-2">
            <h3 className="text-2xl text-fis-blue mb-4">Wealth Transition</h3>
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
          <div className="w-1/2 pl-fis-2">
            <div className="bg-slate-500 w-full aspect-video rounded-lg" />
          </div>
        </div>
      </section>
      <div className="w-full bg-slate-100 pb-fis-2">
        <SubscribeSection />
      </div>
    </>
  );
};

InvestmentManagementPage.getSubLayout = subLayout;

export default InvestmentManagementPage;
