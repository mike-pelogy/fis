import { NextPageWithLayout } from "@/pages/_app";
import { subLayout } from "../retirement-plans";
import ConnectWithUs from "@/components/ConnectWithUs";
import classNames from "classnames";
import getGqlRequest from "@/data/getGqlRequest";
import { endowmentsPageQuery } from "@/data/endowmentsPageQuery";
import { Page_Endowments } from "@/gql/graphql";
import Image from "next/image";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";

export async function getStaticProps() {
  const { data } = await getGqlRequest(endowmentsPageQuery);

  return {
    props: {
      data: data.page.endowments,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--blue)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const EndowmentsPage: NextPageWithLayout<{ data: Page_Endowments }> = ({
  data,
}) => {
  const {
    introduction,
    howFisHelps,
    goverance,
    educationAndACultureOfPhilanthropy,
  } = data;
  return (
    <>
      <Head>
        <title>{buildPageTitle("Endowments")}</title>
      </Head>
      <section
        className={classNames(
          "w-full px-4 md:px-fis-2 p-fis-2 flex justify-center",
          radialBg
        )}
      >
        <div className="container flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <div
              className="max-w-[400px]"
              dangerouslySetInnerHTML={{ __html: introduction || "" }}
            />
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center">
        <div className="container flex flex-col md:flex-row items-center bg-slate-100 rounded-lg">
          <div className="w-full md:w-1/2 px-4 md:p-fis-2 p-fis-2">
            <div className="mb-fis-2">
              <div
                className="text-2xl text-fis-blue mb-4"
                dangerouslySetInnerHTML={{ __html: howFisHelps?.title || "" }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: howFisHelps?.description || "",
                }}
              />
            </div>
            <div className="mb-fis-2">
              <div
                className="text-2xl text-fis-blue mb-4"
                dangerouslySetInnerHTML={{ __html: goverance?.title || "" }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: goverance?.description || "",
                }}
              />
            </div>
            <div>
              <div
                className="text-2xl text-fis-blue mb-4"
                dangerouslySetInnerHTML={{
                  __html: educationAndACultureOfPhilanthropy?.title || "",
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: educationAndACultureOfPhilanthropy?.description || "",
                }}
              />
            </div>
          </div>
          <div className="w-1/2 h-full">
            <Image
              src="/FISHelp.png"
              alt="FIS helps"
              width={1500}
              height={1500}
              className="h-full"
            />
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
