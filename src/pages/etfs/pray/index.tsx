import Button from "@/components/Button";
import ETF from "@/components/ETF";
import getGqlRequest from "@/data/getGqlRequest";
import { prayPageQuery } from "@/data/prayPageQuery";
import {
  Page_Kocg_DataReference,
  Page_Kocg_Documents,
  Page_Kocg_Holdings,
  Page_Kocg_Overview,
  Page_Kocg_Performance,
  Page_Kocg_Pricing,
  Page_Pray,
  Page_Pray_Landing,
} from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import ArrowRight from "@/svgs/ArrowRight";
import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";

export async function getStaticProps() {
  const { data } = await getGqlRequest(prayPageQuery);

  return {
    props: {
      data: data.page.pray,
      title: data.page.title,
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
          <div className="w-full aspect-video bg-slate-500 rounded-lg" />
        </div>
      </section>
    </div>
  );
};

const PrayPage: NextPageWithLayout<{
  data: Page_Pray;
  title: string;
}> = ({ data, title }) => {
  return (
    <>
      <Head>
        <title>{buildPageTitle("PRAY")}</title>
      </Head>
      {data.landing && title && (
        <Landing landing={data.landing} title={title} />
      )}
      {data.overview &&
        data.pricing &&
        data.performance &&
        data.distributions &&
        data.distributionsCopy &&
        data.documents && (
          <ETF
            typeIndex={1}
            overview={data.overview as Page_Kocg_Overview}
            pricing={data.pricing as Page_Kocg_Pricing}
            performance={data.performance as Page_Kocg_Performance}
            distributions={data.distributions}
            holdings={data.distributionsCopy as Page_Kocg_Holdings}
            documents={data.documents as Page_Kocg_Documents}
            dataReference={data.dataReference as Page_Kocg_DataReference}
          />
        )}
    </>
  );
};

PrayPage.getLayout = (page: ReactElement) => {
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
            The investment adviser, Faith Investor Services, LLC (FIS) and the
            sub-adviser, Capital Insight Partners, LLC, have limited or no
            previous experience managing a registered fund. As a result, there
            is no long-term track record against which an investor may judge the
            adviser or sub-adviser and it is possible they may not achieve the
            Fund’s intended investment objective.
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
            The MSCI World Index, which is part of The Modern Index Strategy, is
            a broad global equity index that represents large and mid-cap equity
            performance across 23 developed markets countries. It covers
            approximately 85% of the free float-adjusted market capitalization
            in each country and MSCI world index does not offer exposure to
            emerging markets.
          </p>
           
        </div>
      </div>
    </>
  );
};

export default PrayPage;
