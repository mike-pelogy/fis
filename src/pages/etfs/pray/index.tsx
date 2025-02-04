import Button from "@/components/Button";
import ETF from "@/components/ETF";
import getEtfFooterLayout from "@/components/EtfFooterLayout";
import EtfSkeleton from "@/components/EtfSkeleton";
import VideoPlayer from "@/components/VideoPlayer";
import getGqlRequest from "@/data/getGqlRequest";
import { prayPageQuery } from "@/data/prayPageQuery";
import {
  Page_Kocg_DataReference,
  Page_Kocg_Distributions,
  Page_Kocg_Documents,
  Page_Kocg_Holdings,
  Page_Kocg_Overview,
  Page_Kocg_Performance,
  Page_Kocg_Pricing,
  Page_Pray,
  Page_Pray_Landing,
} from "@/gql/graphql";
import useEtfData from "@/hooks/useEtfData";
import { NextPageWithLayout } from "@/pages/_app";
import ArrowRight from "@/svgs/ArrowRight";
import buildPageTitle from "@/utils/buildPageTitle";
import fetchAndDownload from "@/utils/fetchAndDownload";
import type { ETFDataType } from "@/utils/getEtfData";
import Head from "next/head";

export async function getStaticProps() {
  const { data } = await getGqlRequest(prayPageQuery);

  return {
    props: {
      data: data.page.pray,
      title: data.page.title,
      customFooter: data.page.customerFooter,
    },
  };
}

const Landing = ({
  landing,
  title,
}: {
  landing: Page_Pray_Landing;
  title: string;
}) => {
  return (
    <div className="bg-slate-50 w-full py-fis-2 flex justify-center px-4 md:px-0">
      <section className="container flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 md:pr-fis-4 pr-0">
          <h1 className="text-3xl md:text-5xl mb-8">{title}</h1>
          <h3 className="text-fis-blue text-2xl">FIS Christian Stock Fund</h3>
          <hr className="mt-4 mb-6" />
          <span
            dangerouslySetInnerHTML={{ __html: landing.description as string }}
          />
          <div className="flex justify-end mt-8">
            <Button
              variant="primary"
              href="#Overview"
              IconButton={<ArrowRight />}
            >
              Learn more
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-fis-2 md:mt-0">
          <VideoPlayer src={landing.video || ""} />
        </div>
      </section>
    </div>
  );
};

const PrayPage: NextPageWithLayout<{
  data: Page_Pray;
  title: string;
}> = ({ data, title }) => {
  const { isLoading, dailyRes, monthlyRes, quarterlyRes, holdingsRes } =
    useEtfData();

  const etfData: ETFDataType = {
    dailyRes,
    monthlyRes,
    quarterlyRes,
    holdingsRes,
  };

  const handleDownloadPrem = () => {
    fetchAndDownload("/download/premium/pray");
  };

  const handleDownloadHoldings = () => {
    fetchAndDownload("/download/holdings");
  };


  return (
    <>
      <Head>
        <title>{buildPageTitle("PRAY")}</title>
      </Head>
      {data.landing && title && (
        <Landing landing={data.landing} title={title} />
      )}
      { isLoading && <EtfSkeleton /> }
      {!isLoading &&
        data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents && (
          <ETF
            etfData={etfData}
            handleDownloadPrem={handleDownloadPrem}
            handleDownloadHoldings={handleDownloadHoldings}
            typeIndex={1}
            overview={data.overview as Page_Kocg_Overview}
            pricing={data.pricing as Page_Kocg_Pricing}
            performance={data.performance as Page_Kocg_Performance}
            distributions={data.distributions as Page_Kocg_Distributions}
            holdings={data.distributionsCopy as Page_Kocg_Holdings}
            documents={data.documents as Page_Kocg_Documents}
            dataReference={data.dataReference as Page_Kocg_DataReference}
          />
        )}
    </>
  );
};

PrayPage.getLayout = getEtfFooterLayout;

export default PrayPage;
