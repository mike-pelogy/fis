import Button from "@/components/Button";
import ETF from "@/components/ETF";
import FunBackground from "@/components/FunBackground";
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
            <Button
              variant="primary"
              href={landing.cta?.url || ''}
              IconButton={<ArrowRight />}
            >
              {landing.cta?.title}
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <div className="w-full aspect-video bg-slate-500 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

const Values = ({ values }: { values: Page_Kocg_Values }) => {
  return (
    <div className="flex justify-center relative w-full pt-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <div className="flex flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/2 pr-0 md:pr-fis-2 mt-fis-2 md:mt-0">
              <div className="w-full aspect-video bg-slate-500 rounded-lg" />
            </div>
            <div className="w-full md:w-1/2">
              <div
                className="[&>p:text-lg]"
                dangerouslySetInnerHTML={{
                  __html: values.description as string,
                }}
              />
              <div className="flex gap-4 md:gap-8 flex-col md:flex-row items-start md:items-center my-8">
                <div className="w-[168px] h-[60px] bg-slate-500 rounded-lg" />
                <Button
                  variant="primary"
                  href={values.moreInfo?.url as string}
                  IconButton={<ArrowRight />}
                >
                  {values.moreInfo?.title}
                </Button>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: values.investmentPolicy as string,
                }}
                className="mb-4"
              />
              <div
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

const Quote = ({ quote }: { quote: Page_Kocg_Quote }) => {
  return (
    <div className="bg-slate-50 w-full pt-fis-2 flex justify-center">
      <section className="container flex flex-col px-4 md:px-0 md:flex-row justify-center">
        <div className="pb-fis-2 flex flex-col pr-0 md:pr-fis-2 max-w-[630px]">
          <div
            className="text-2xl text-fis-purple"
            dangerouslySetInnerHTML={{ __html: quote.quote || "" }}
          />
          <div className="flex items-center gap-8 mt-8">
            <div>
              <div className="w-[168px] h-[60px] bg-slate-500 rounded-lg" />
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: quote.description || "" }}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[325px] h-[400px] bg-slate-500 rounded-t-lg" />
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
          Privacy Policy Investors should consider the investment objectives,
          risks, charges and expenses carefully before investing. For a
          prospectus or summary prospectus with this and other information about
          the Funds can be found here, PRAY or KOCG. Read the prospectus or
          summary prospectus carefully before investing. Investing in ETFs
          involves risk and there is no guarantee the Funds’ investment strategy
          will be successful and you can lose money on your investment in the
          fund. Shares may trade at a premium or discount to their NAV in the
          secondary market. The fund is new and has limited operating history to
          judge. ETFs are Distributed by Foreside Fund Services, LLC. Market
          Risk. The prices of securities held by the Fund may decline in
          response to certain events taking place around the world, including
          those directly involving the companies whose securities are owned by
          the Fund; conditions affecting the general economy; overall market
          changes; local, regional, or global political, social or economic
          instability; and currency, interest rate and commodity price
          fluctuations. Foreign and Emerging Markets Risks. Investments in
          foreign securities may involve risks such as social and political
          instability, market illiquidity, exchange-rate fluctuations, a high
          level of volatility and limited regulation. Investing in emerging
          markets involves different and greater risks, as these countries are
          substantially smaller, less liquid, and more volatile than securities
          markets in more developed markets. Active Management Risk. The Fund is
          actively managed, which means that investment decisions are made based
          on investment views. There is no guarantee that the investment views
          will produce the desired results or expected returns, which may cause
          the Fund to fail to meet its investment objective or to underperform
          its benchmark index or funds with similar investment objectives and
          strategies. Christian Values Investing Risk. The Fund considers
          Christian values in its investment process and may choose not to
          purchase, or may sell, otherwise profitable investments in companies.
          This means that the Fund may underperform other similar funds that do
          not consider Christian values when making investment decisions.
          Depositary Receipts. The Fund will invest in stocks of foreign
          corporations, customarily be in the form of depositary receipts
          including American Depositary Receipts (ADR) and Global Depositary
          Receipts (GDR), which are subject to many of the risks associated with
          investing directly in foreign securities, including political,
          economic, and currency risk. Underlying Fund Risk. To the extent that
          the Fund invests in other funds, a shareholder will bear two layers of
          asset-based expenses, which could reduce returns compared to a direct
          investment in the underlying funds. The investment adviser, Faith
          Investor Services, LLC (FIS) and the sub-adviser, Capital Insight
          Partners, LLC, have limited or no previous experience managing a
          registered fund. As a result, there is no long-term track record
          against which an investor may judge the adviser or sub-adviser and it
          is possible they may not achieve the Fund’s intended investment
          objective. 30-day SEC Yield is based on a formula mandated by the
          Securities and Exchange Commission (SEC) that calculates a fund’s
          hypothetical annualized income, as a percentage of its assets. A
          security’s income, for the purposes of this calculation, is based on
          the current market yield to maturity (in the case of bonds) or
          projected dividend yield (for stocks) of the fund’s holdings over a
          trailing 30-day period. This hypothetical income will differ (at
          times, significantly) from the fund’s actual experience; as a result,
          income distributions from the fund may be higher or lower than implied
          by the SEC yield. The MSCI World Index, which is part of The Modern
          Index Strategy, is a broad global equity index that represents large
          and mid-cap equity performance across 23 developed markets countries.
          It covers approximately 85% of the free float-adjusted market
          capitalization in each country and MSCI world index does not offer
          exposure to emerging markets.
        </div>
      </div>
    </>
  );
};

export default KocgPage;
