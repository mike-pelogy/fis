import Button from "@/components/Button";
import ETF, { fancyNumberList } from "@/components/ETF";
import getEtfFooterLayout from "@/components/EtfFooterLayout";
import FunBackground from "@/components/FunBackground";
import VideoPlayer from "@/components/VideoPlayer";
import WhiteContainer from "@/components/WhiteContainer";
import getGqlRequest from "@/data/getGqlRequest";
import { kocgPageQuery } from "@/data/kocgPageQuery";
import {
  Page_Kocg,
  Page_Kocg_Landing,
  Page_Kocg_Quote,
  Page_Kocg_Values,
} from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import ArrowRight from "@/svgs/ArrowRight";
import buildPageTitle from "@/utils/buildPageTitle";
import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import fetchAndDownload from "@/utils/fetchAndDownload";
import type { ETFDataType } from "@/utils/getEtfData";
import useEtfData from "@/hooks/useEtfData";

export async function getStaticProps() {
  const { data } = await getGqlRequest(kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
      customFooter: data.page.customerFooter,
    },
  };
}

const Landing = ({
  landing,
  title,
}: {
  landing: Page_Kocg_Landing;
  title: string;
}) => {
  return (
    <div className="bg-slate-50 w-full py-fis-2 flex justify-center">
      <section className="container flex flex-col px-4 md:px-0 md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-0 md:pr-fis-4">
          <h1 className="text-3xl md:text-5xl mb-8">{title}</h1>
          <h3 className="text-fis-blue text-2xl">
            FIS Knights of Columbus Global Belief ETF
          </h3>
          <hr className="mt-4 mb-6" />
          <span
            className="[&>p:text-lg]"
            dangerouslySetInnerHTML={{ __html: landing.description as string }}
          />
          <div className="flex justify-end mt-8">
            <Button variant="primary" href="#Kocg" IconButton={<ArrowRight />}>
              Learn more
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <VideoPlayer src={landing.video || ""} />
        </div>
      </section>
    </div>
  );
};

const Values = ({ values }: { values: Page_Kocg_Values }) => {
  return (
    <div
      className="flex justify-center relative w-full bg-slate-100 pt-fis-2"
      id="Kocg"
    >
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 pr-0 md:pr-fis-2 mt-fis-2 md:mt-0">
              <VideoPlayer src={values.video || ""} />
            </div>
            <div className="w-full md:w-1/2">
              <div
                className="[&_p:text-lg] mb-6"
                dangerouslySetInnerHTML={{
                  __html: values.description as string,
                }}
              />
              <div
                className="max-w-[350px] [&_strong]:text-2xl [&_p]:mb-1 [&_p]:text-xs [&_p]:text-slate-500 [&_strong]:text-fis-purple mb-4"
                dangerouslySetInnerHTML={{
                  __html: values.investmentPolicy as string,
                }}
              />
              <div
                className={classNames(
                  fancyNumberList,
                  "lg:[&>ol]:max-h-[8rem] [&>ol]:flex [&>ol]:gap-4 [&>ol]:flex-wrap [&>ol]:flex-col [&>ol>li]:font-bold [&>ol>li]:!pl-6 [&>ol>li]:before:text-xl [&>ol]:!space-y-0 [&_p]:text-2xl [&_p]:text-fis-blue [&_p]:mb-2"
                )}
                dangerouslySetInnerHTML={{
                  __html: values.guidelines as string,
                }}
              />
            </div>
          </div>
        </WhiteContainer>
      </div>
    </div>
  );
};

export const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--purple)/0.25)_0%,rgba(256,256,256,0)_50%)]";

const Quote = ({ quote }: { quote: Page_Kocg_Quote }) => {
  return (
    <div
      className={classNames(
        radialBg,
        "bg-slate-100 w-full pt-fis-2 flex justify-center"
      )}
    >
      <section className="container flex flex-col px-4 md:px-0 md:flex-row justify-center">
        <div className="pb-fis-2 flex flex-col pr-0 md:pr-fis-2 max-w-[630px]">
          <div
            className="text-2xl text-fis-purple before:content-['“'] before:absolute relative before:left-0 before:top-0 pl-8 before:text-fis-purple before:text-6xl"
            dangerouslySetInnerHTML={{ __html: quote.quote || "" }}
          />
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mt-8">
            <div>
              <Image
                className="w-[120px]"
                src={quote.kocLogo?.mediaItemUrl || ""}
                alt={quote.kocLogo?.altText || ""}
                width={300}
                height={120}
              />
            </div>
            <div
              className="[&>p]:mb-1"
              dangerouslySetInnerHTML={{ __html: quote.description || "" }}
            />
          </div>
        </div>
        <div className="flex justify-center items-end">
          <Image
            className="w-[325px] h-[325px] object-contain object-bottom"
            src={quote.photo?.mediaItemUrl || ""}
            alt={quote.photo?.altText || ""}
            width={650}
            height={800}
          />
        </div>
      </section>
    </div>
  );
};

const KocgPage: NextPageWithLayout<{
  data: Page_Kocg;
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
    fetchAndDownload("/download/premium/kocg");
  };

  return (
    <>
      <Head>
        <title>{buildPageTitle("KOCG")}</title>
      </Head>
      {data.landing && title && (
        <Landing landing={data.landing} title={title} />
      )}
      {data.values && <Values values={data.values} />}
      {data.quote && <Quote quote={data.quote} />}
      {!isLoading &&
        data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents &&
        data.dataReference && (
          <ETF
            handleDownloadPrem={handleDownloadPrem}
            etfData={etfData}
            typeIndex={0}
            overview={data.overview}
            pricing={data.pricing}
            performance={data.performance}
            distributions={data.distributions}
            holdings={data.distributionsCopy}
            documents={data.documents}
            dataReference={data.dataReference}
          />
        )}
    </>
  );
};

KocgPage.getLayout = getEtfFooterLayout;

export default KocgPage;
