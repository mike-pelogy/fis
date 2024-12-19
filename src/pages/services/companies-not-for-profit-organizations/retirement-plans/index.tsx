import FunBackground from "@/components/FunBackground";
import { NavBar } from "@/components/NavBar";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement } from "react";
import { Nav } from "../../individuals/financial-planning";
import { SubscribeSection } from "@/pages/contact";
import getGqlRequest from "@/data/getGqlRequest";
import { retirementPlansPageQuery } from "@/data/retirementPlansPageQuery";
import { Page_Retirementplans } from "@/gql/graphql";
import { fancyBulletPoints } from "@/pages/about";
import Image from "next/image";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import classNames from "classnames";

export async function getStaticProps() {
  const { data } = await getGqlRequest(retirementPlansPageQuery);

  return {
    props: {
      data: data.page.retirementPlans,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--purple)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const FinancialPlanningPage: NextPageWithLayout<{
  data: Page_Retirementplans;
}> = ({ data }) => {
  const { introduction, servicesBenefits } = data;

  return (
    <>
      <Head>
        <title>{buildPageTitle("Retirement plans")}</title>
      </Head>
      <div className="flex justify-center relative w-full pt-fis-2 pb-fis-2">
        <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[-1]">
          <FunBackground />
        </div>
        <section className="container px-4 md:px-fis-2 relative">
          <div className="overflow-hidden relative rounded-lg before:content-[''] before:absolute before:w-full before:h-full before:bg-slate-100 before:opacity-95 before:rounded-lg before:left-0 before:right-0">
            <div className="flex flex-col md:flex-row px-4 md:px-fis-2 p-fis-2 relative">
              <div className="w-full md:w-1/2 pr-0 md:pr-fis-1">
                <div
                  dangerouslySetInnerHTML={{
                    __html: introduction?.intro || "",
                  }}
                />
              </div>
              <div className="w-full md:w-1/2 pl-0 md:pl-fis-1 mt-fis-2 md:mt-0">
                <div
                  className="text-2xl font-bold text-fis-purple mb-2"
                  dangerouslySetInnerHTML={{
                    __html: introduction?.quote || "",
                  }}
                />
                <div
                  dangerouslySetInnerHTML={{
                    __html: introduction?.intro2 || "",
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="container px-4 md:px-fis-2 p-fis-2">
        <div className="w-full md:w-1/2 pr-0 md:pr-fis-2 mb-4">
          <div
            className="text-lg mb-4"
            dangerouslySetInnerHTML={{
              __html: servicesBenefits?.title || "",
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: servicesBenefits?.description || "",
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-fis-2 flex flex-col gap-6">
            {servicesBenefits?.servicesAndBenefits?.map((sandb, index) => {
              return (
                <div key={sandb?.title}>
                  <div className="flex relative pl-8">
                    <span className="text-xl font-bold text-fis-blue absolute left-0">
                      {index + 1}
                    </span>
                    <div
                      className="text-xl font-bold text-fis-blue mb-2"
                      dangerouslySetInnerHTML={{
                        __html: sandb?.title || "",
                      }}
                    />
                  </div>
                  <div
                    className={classNames(fancyBulletPoints, "pl-8")}
                    dangerouslySetInnerHTML={{
                      __html: sandb?.description || "",
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full md:w-1/2 mt-fis-2 md:mt-0">
            <Image
              src="/EstablishedRelationships.png"
              alt="You worked hard to secure your wealth"
              width={1500}
              height={1500}
              className="rounded-lg"
            />
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
      <div className="pt-fis-1 w-full bg-slate-100" />
      <div className="w-full bg-slate-100 flex justify-center sticky top-[79px] md:top-[100px] z-[1000]">
        <div className="container w-full">
          <Nav />
        </div>
      </div>
      <div className="pb-fis-1 w-full bg-slate-100" />
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
