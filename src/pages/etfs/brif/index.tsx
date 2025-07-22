import Button from "@/components/Button";
import ETF from "@/components/ETF";
import getGqlRequest from "@/data/getGqlRequest";
import { brifPageQuery } from "@/data/brifPageQuery";
import {
  Page_Brif,
  Page_Brif_DataReference,
  Page_Brif_Distributions,
  Page_Brif_Documents,
  Page_Brif_Holdings,
  Page_Brif_Landing,
  Page_Brif_Overview,
  Page_Brif_Performance,
  Page_Brif_Pricing,
} from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import ArrowRight from "@/svgs/ArrowRight";
import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";
import getEtfFooterLayout from "@/components/EtfFooterLayout";
import type { ETFDataType } from "@/utils/getEtfData";
import useEtfData from "@/hooks/useEtfData";
import { fetchAndDownloadCsv } from "@/utils/fetchAndDownload";

export async function getStaticProps() {
  const { data } = await getGqlRequest(brifPageQuery);

  return {
    props: {
      data: data.page.brif,
      title: data.page.title,
      customFooter: data.page.customerFooter,
    },
  };
}

const Landing = ({
  landing,
  title,
}: {
  landing: Page_Brif_Landing;
  title: string;
}) => {
  return (
    <div className="bg-slate-50 w-full py-fis-2 flex justify-center px-4 md:px-0">
      <section className="container flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 md:pr-fis-4 pr-0">
          <h1 className="text-3xl md:text-5xl mb-8">{title}</h1>
          <h3
            className="text-fis-blue text-2xl"
            dangerouslySetInnerHTML={{ __html: landing.subtitle as string }}
          />
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
        <div className="w-full md:w-1/2 mt-fis-2 md:mt-0" />
      </section>
    </div>
  );
};

const BrifPage: NextPageWithLayout<{
  data: Page_Brif;
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

  const handleDownloadHoldings = () => {
    fetchAndDownloadCsv("/download/holdings/brif");
  };

  return (
    <>
      <Head>
        <title>{buildPageTitle("BRIF")}</title>
      </Head>
      {data.landing && title && (
        <Landing landing={data.landing} title={title} />
      )}
      {!isLoading &&
        data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents && (
          <ETF
            etfData={etfData}
            handleDownloadHoldings={handleDownloadHoldings}
            typeIndex={1}
            overview={data.overview as Page_Brif_Overview}
            pricing={data.pricing as Page_Brif_Pricing}
            performance={data.performance as Page_Brif_Performance}
            distributions={data.distributions as Page_Brif_Distributions}
            holdings={data.distributionsCopy as Page_Brif_Holdings}
            documents={data.documents as Page_Brif_Documents}
            dataReference={data.dataReference as Page_Brif_DataReference}
          />
        )}
    </>
  );
};

BrifPage.getLayout = getEtfFooterLayout;

export default BrifPage;
