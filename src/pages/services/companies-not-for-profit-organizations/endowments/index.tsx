import { API } from "@/constants";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import { NextPageWithLayout } from "@/pages/_app";
import request from "graphql-request";
import { subLayout } from "../retirement-plans";
import ConnectWithUs from "@/components/ConnectWithUs";
import classNames from "classnames";

export async function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await request(API, kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--blue)/0.15)_0%,rgba(256,256,256,1)_50%)]";

// TODO: finish middle section
const EndowmentsPage: NextPageWithLayout = () => {
  return (
    <>
      <section
        className={classNames(
          "w-full px-4 md:px-fis-2 p-fis-2 flex justify-center",
          radialBg
        )}
      >
        <div className="container flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-1/2">
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
      <section className="w-full flex justify-center">
        <div className="container flex flex-col md:flex-row items-center bg-slate-100 rounded-lg">
          <div className="w-full md:w-1/2 px-4 md:p-fis-2 p-fis-2">
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
            <div className="bg-slate-500 w-full h-full" />
          </div>
        </div>
      </section>
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

EndowmentsPage.getSubLayout = subLayout;

export default EndowmentsPage;
