import Button from "@/components/Button";
import ETF, { fancyNumberList } from "@/components/ETF";
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
import Link from "next/link";
import { ReactElement } from "react";

export async function getStaticProps() {
  const { data } = await getGqlRequest(kocgPageQuery);

  return {
    props: {
      data: data.page.kocg,
      title: data.page.title,
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
              {landing.cta?.title}
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a7/How_to_make_video.webm/How_to_make_video.webm.1080p.vp9.webm" />
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
              <VideoPlayer src="https://upload.wikimedia.org/wikipedia/commons/transcoded/a/a7/How_to_make_video.webm/How_to_make_video.webm.1080p.vp9.webm" />
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
                  "lg:[&>ol]:max-h-[7rem] [&>ol]:flex [&>ol]:gap-4 [&>ol]:flex-wrap [&>ol]:flex-col [&>ol>li]:font-bold [&>ol>li]:!pl-6 [&>ol>li]:before:text-xl [&>ol]:!space-y-0 [&_p]:text-2xl [&_p]:text-fis-blue [&_p]:mb-2"
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
                src="/Knights-logo 2.png"
                alt="KOC logo"
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
            src="/Patrick-2.png"
            alt="Patrick Kelly"
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
      {data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents &&
        data.dataReference && (
          <ETF
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

KocgPage.getLayout = (page: ReactElement) => {
  return (
    <>
      {page}
      <div className="flex justify-center py-fis-2 bg-slate-100">
        <div className="container px-4 md:px-0">
          <p>
            <strong>Privacy Policy</strong>
          </p>
          <p>
            Investors should consider the investment objectives, risks, charges
            and expenses carefully before investing. For a prospectus or summary
            prospectus with this and other information about the Funds can be
            found here, <Link href="/etfs/pray">PRAY</Link> or <Link href="/etfs/kocg">KOCG</Link>. Read the prospectus or summary prospectus
            carefully before investing.
          </p>
          <p>
            Investing in ETFs involves risk and there is no guarantee the Funds’
            investment strategy will be successful and you can lose money on
            your investment in the fund. Shares may trade at a premium or
            discount to their NAV in the secondary market. The fund is new and
            has limited operating history to judge.
          </p>
          <p>ETFs are Distributed by Foreside Fund Services, LLC.</p>
          <p>
            Market Risk. The prices of securities held by the Fund may decline
            in response to certain events taking place around the world,
            including those directly involving the companies whose securities
            are owned by the Fund; conditions affecting the general economy;
            overall market changes; local, regional, or global political, social
            or economic instability; and currency, interest rate and commodity
            price fluctuations. Foreign and Emerging Markets Risks. Investments
            in foreign securities may involve risks such as social and political
            instability, market illiquidity, exchange-rate fluctuations, a high
            level of volatility and limited regulation. Investing in emerging
            markets involves different and greater risks, as these countries are
            substantially smaller, less liquid, and more volatile than
            securities markets in more developed markets. Active Management
            Risk. The Fund is actively managed, which means that investment
            decisions are made based on investment views. There is no guarantee
            that the investment views will produce the desired results or
            expected returns, which may cause the Fund to fail to meet its
            investment objective or to underperform its benchmark index or funds
            with similar investment objectives and strategies. Christian Values
            Investing Risk. The Fund considers Christian values in its
            investment process and may choose not to purchase, or may sell,
            otherwise profitable investments in companies. This means that the
            Fund may underperform other similar funds that do not consider
            Christian values when making investment decisions. Depositary
            Receipts. The Fund will invest in stocks of foreign corporations,
            customarily be in the form of depositary receipts including American
            Depositary Receipts (ADR) and Global Depositary Receipts (GDR),
            which are subject to many of the risks associated with investing
            directly in foreign securities, including political, economic, and
            currency risk. Underlying Fund Risk. To the extent that the Fund
            invests in other funds, a shareholder will bear two layers of
            asset-based expenses, which could reduce returns compared to a
            direct investment in the underlying funds.
          </p>
          <p>
            30-day SEC Yield is based on a formula mandated by the Securities
            and Exchange Commission (SEC) that calculates a fund’s hypothetical
            annualized income, as a percentage of its assets. A security’s
            income, for the purposes of this calculation, is based on the
            current market yield to maturity (in the case of bonds) or projected
            dividend yield (for stocks) of the fund’s holdings over a trailing
            30-day period. This hypothetical income will differ (at times,
            significantly) from the fund’s actual experience; as a result,
            income distributions from the fund may be higher or lower than
            implied by the SEC yield.
          </p>
          <p>
            The MSCI ACWI Index, captures large and mid cap representation
            across 23 Developed Markets (DM) and 24 Emerging Markets (EM)
            countries*. With 2,921 constituents, the index covers approximately
            85% of the global investable equity opportunity set.
          </p>
           
        </div>
      </div>
    </>
  );
};

export default KocgPage;
