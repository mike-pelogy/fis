import ConnectWithUs from "@/components/ConnectWithUs";
import FunBackground from "@/components/FunBackground";
import { NavBar } from "@/components/NavBar";
import WhiteContainer from "@/components/WhiteContainer";
import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import { NextPageWithLayout } from "@/pages/_app";
import classNames from "classnames";
import request from "graphql-request";
import { ReactElement } from "react";

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
      <div className="w-full pb-fis-2">
        <div className="flex justify-center relative w-full pt-fis-2">
          <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
            <FunBackground />
          </div>
          <div className="container w-full">
            <WhiteContainer>
              <section>
                <h3 className="text-2xl text-fis-blue mb-4">Collaboration</h3>
                <div className="flex">
                  <div className="w-1/2 pr-fis-2">
                    <p>
                      FIS believes a well-crafted financial plan expresses your
                      most meaningful values and goals. Our process drives to
                      your clear goals and helps focus your actions thus
                      allowing you to proceed with confidence. Life is
                      unpredictable. It is our goal for you to go forward with a
                      sense of confidence. With Faith Investor Services, you
                      have a team of professionals by your side to guide you
                      through life’s challenges and uncover opportunities. We
                      guide you in planning for life’s unexpected events:
                    </p>
                  </div>
                  <div className="w-1/2">
                    <div className="bg-slate-500 rounded-lg w-full aspect-video" />
                  </div>
                </div>
              </section>
            </WhiteContainer>
          </div>
        </div>
      </div>
      <ConnectWithUs
        connectWithUs={{
          link: { title: "Connect with us", url: "/contact" },
          title: "Interested in more information?",
          description: "Reach out and let’s explore how we can support you.",
        }}
      />
    </>
  );
};

export const Nav = () => {
  return (
    <NavBar
      navBar={[
        {
          title: "Individuals",
          href: "/services/individuals/financial-planning",
        },
        {
          title: "Companies & Not-For-Profit Organizations",
          href: "/services/companies-not-for-profit-organizations/retirement-plans",
        },
        {
          title: "Separately Managed Accounts (SMA)",
          href: "/services/separately-managed-accounts",
        },
      ]}
    />
  );
};

export const subLayout = (page: ReactElement) => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="container w-full">
        <Nav />
      </div>
      <section className="container w-full px-fis-2 py-fis-1 flex items-center">
        <div className="w-1/2 pr-fis-2">
          <h3 className="text-2xl text-fis-blue">
            You worked hard to secure your wealth.
          </h3>
          <hr className="my-4" />
          <p>
            Our first priority is to protect what you entrust to us. As a
            thoughtful, caring steward, we help those with more than $2 million
            plan and invest for their financial goals. Our family office
            services include financial planning and comprehensive global wealth
            management for individuals and business owners.
          </p>
        </div>
        <div className="w-1/2">
          <div className="bg-slate-500 w-full aspect-video rounded-lg" />
        </div>
      </section>
      <div className="container w-full">
        <NavBar
          className="!pb-0"
          navBar={[
            {
              title: "Financial Planning",
              href: "/services/individuals/financial-planning",
            },
            {
              title: "Investment Management",
              href: "/services/individuals/investment-management",
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
