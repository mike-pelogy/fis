import React from "react";
import Button from "@/components/Button";
// eslint-disable-next-line
import {
  MediaItem,
  Page_Kocg_DataReference,
  Page_Kocg_Documents,
  Page_Kocg_Holdings,
  Page_Kocg_Overview,
  Page_Kocg_Performance,
  Page_Kocg_Pricing,
} from "@/gql/graphql";
import classNames from "classnames";
// eslint-disable-next-line
import { useState } from "react";
import FunBackground from "./FunBackground";
import WhiteContainer from "./WhiteContainer";
import { NavBar } from "./NavBar";
import ArrowRight from "@/svgs/ArrowRight";
import Pdf from "@/svgs/Pdf";
// @ts-expect-error file import
import dailyNav from "../../public/FaithInvSvrs.40KF.KF_DailyNAV.csv";
// @ts-expect-error file import
import monthlyPerf from "../../public/FaithInvSvrs.40KF.KF_MonthlyPerformance.csv";
// @ts-expect-error file import
import quarterlyPerf from "../../public/FaithInvSvrs.40KF.KF_QuarterlyPerformance.csv";
// @ts-expect-error file import
import topHoldings from "../../public/FaithInvSvrs.40KF.TOP10_Holdings.csv";
import { getPerfList } from "@/utils/performanceData";
import { getDailyData } from "@/utils/dailyData";

type SectionTypes =
  | "Overview"
  | "Pricing"
  | "Performance"
  | "Distributions"
  | "Holdings"
  | "Documents";

interface INavBar {
  title: string;
  href?: string;
}

const navBar: INavBar[] = [
  { title: "Overview" },
  { title: "Pricing" },
  { title: "Performance" },
  { title: "Distributions" },
  { title: "Holdings" },
  { title: "Documents" },
];

// TODO: make this come from wordpress
const dataBinding = [
  {
    FundInception: "07/14/2021",
    ISIN: "US78433H1059",
    Gross: "0.75%",
    PrimaryExchange: "NYSE Arca",
    Index: "MSCI ACWI Index",
    DistributionFrequency: "Annually",
  },
  {
    FundInception: "02/08/2022",
    ISIN: "US78433H2040",
    Gross: "0.69%",
    PrimaryExchange: "NYSE Arca",
    Index: "MSCI ACWI Index",
    DistributionFrequency: "Annually",
  },
];

interface ITypeIndex {
  /**
   * 0 - KOCG
   * 1 - PRAY
   */
  typeIndex: 0 | 1;
}

export const fancyNumberList =
  "[&>ol]:space-y-fis-1 [&>ol>li]:pl-fis-2 [&>ol>li]:relative [&>ol>li]:[counter-increment:section] [&>ol>li]:before:[content:counters(section,'.')] [&>ol>li]:before:text-fis-blue [&>ol>li]:before:text-3xl [&>ol>li]:before:absolute [&>ol>li]:before:left-0 [&>ol>li]:before:top-0 [&>ol>li]:before:font-bold";

const Overview = ({
  overview,
  id,
  typeIndex = 0,
}: //  daily,
{
  overview: Page_Kocg_Overview;
  id: SectionTypes;
  daily: MediaItem;
} & ITypeIndex) => {
  const data = dailyNav[typeIndex];
  const d = dataBinding[typeIndex];

  const {
    FundInception,
    ISIN,
    Gross,
    PrimaryExchange,
    Index,
    DistributionFrequency,
  } = d;

  const { rateDate, fundTicker, CUSIP, netAssets, shares } = getDailyData(data);

  const info = [
    { title: "Fund Inception", value: FundInception },
    { title: "Fund Ticker", value: fundTicker },
    { title: "CUSIP", value: CUSIP },
    { title: "ISIN", value: ISIN },
    { title: "Gross Expense Ratio", value: Gross },
    { title: "Net Assets", value: netAssets },
    { title: "Shares Outstanding", value: shares },
    { title: "Primary Exchange", value: PrimaryExchange },
    { title: "Index", value: Index },
    { title: "Distribution Frequency", value: DistributionFrequency },
  ];

  return (
    <div className="flex justify-center pt-fis-1">
      <section className="container px-4 md:px-fis-1" id={id}>
        <div className="flex flex-col md:flex-row pb-fis-2">
          <div className="w-full md:w-2/3 pr-0 md:pr-fis-4">
            <h3
              className="text-fis-blue text-2xl mb-4"
              dangerouslySetInnerHTML={{ __html: overview.title as string }}
            />
            <div
              className={classNames(fancyNumberList)}
              dangerouslySetInnerHTML={{
                __html: overview.description as string,
              }}
            />
            <div
              className="[&>p]:text-base [&>p>strong]:font-bold [&>p>strong]:block [&>p>strong]:mb-4 [&>p>strong]:text-lg max-w-[500px] pt-fis-2"
              dangerouslySetInnerHTML={{
                __html: overview.investmentObjectives as string,
              }}
            />
          </div>
          <div className="w-full md:w-1/3 mt-fis-2 md:mt-0">
            <div className="rounded-lg bg-slate-50 p-8 flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="font-bold text-lg">Funding Details</p>
                <p className="font-bold text-lg">As of {rateDate}</p>
              </div>
              {info.map(({ title, value }) => {
                return (
                  <div key={title} className="flex justify-between">
                    <div className="text-slate-500">{title}</div>
                    <div className="text-fis-purple">{value}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <h4 className="font-bold text-lg mb-4">Fund Resources</h4>
              <div className="flex flex-col gap-2 items-start">
                {overview?.fundResources?.map((f) => {
                  return (
                    <Button
                      key={f?.file?.mediaItemUrl as string}
                      href={f?.file?.mediaItemUrl as string}
                      variant="neutral"
                      target="_blank"
                      IconButton={<Pdf />}
                    >
                      {f?.title}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
      </section>
    </div>
  );
};

const SimpleDataTable = ({
  title,
  labelValues,
  className,
}: {
  title: string;
  labelValues: { label: string; value: string }[];
  className?: string;
}) => {
  return (
    <div className={className}>
      <div className="flex-col flex gap-2">
        <p className="font-bold text-lg">{title}</p>
        {labelValues.map(({ label, value }) => {
          return (
            <div key={label} className="flex justify-between">
              {label && <div className="text-slate-500">{label}</div>}
              {value && <div className="text-fis-purple">{value}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Pricing = ({
  pricing,
  id,
  typeIndex = 0,
}: {
  pricing: Page_Kocg_Pricing;
  id: SectionTypes;
} & ITypeIndex) => {
  const data = dailyNav[typeIndex];

  const {
    rateDate,
    NAV,
    NavChangePercentage,
    NavChangeDollars,
    marketPrice,
    marketPriceChangePercentage,
    marketPriceChangeDollars,
    PremiumDiscountPercentage,
    medium30DaySpreadPercentage,
  } = getDailyData(data);

  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className="flex flex-col container w-full py-fis-2 px-4 md:px-fis-1"
      >
        <div className="flex items-end mb-fis-1">
          <h3
            className="text-fis-blue text-2xl"
            dangerouslySetInnerHTML={{ __html: pricing.title as string }}
          />
          <p className="ml-4 text-slate-600">Data as of {rateDate}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-fis-1">
          <div className="w-full md:w-1/3">
            <SimpleDataTable
              className="rounded-lg bg-slate-100 p-8"
              title="Closing NAV Price"
              labelValues={[
                { label: "Net Asset Value", value: `$${marketPrice}` },
                { label: "Daily Change ($)", value: marketPriceChangeDollars },
                {
                  label: "Daily Change (%)",
                  value: marketPriceChangePercentage,
                },
              ]}
            />
          </div>
          <div className="w-full md:w-1/3">
            <SimpleDataTable
              className="rounded-lg p-8"
              title="Closing Market Price"
              labelValues={[
                { label: "Net Asset Value", value: `$${NAV}` },
                { label: "Daily Change ($)", value: NavChangeDollars },
                { label: "Daily Change (%)", value: NavChangePercentage },
              ]}
            />
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-start">
            <SimpleDataTable
              className="rounded-lg bg-slate-100 p-8 mb-8 w-full"
              title="Premium / Discount"
              labelValues={[
                {
                  label: "Premium Discount (%)",
                  value: PremiumDiscountPercentage,
                },
                {
                  label: "30-Day Median Bid-Ask Spread (%)",
                  value: medium30DaySpreadPercentage,
                },
              ]}
            />
            <Button
              href={pricing.premiumOrDiscountInfo?.url as string}
              variant="secondary"
              IconButton={<ArrowRight />}
            >
              {pricing.premiumOrDiscountInfo?.title}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Column = ({ value, className }: { value: any; className?: string }) => {
  return (
    <div
      className={classNames(
        "text-fis-purple flex justify-end text-right items-end",
        className
      )}
    >
      {value || "-"}
    </div>
  );
};

const perfNav = [
  { title: "Monthly Performance" },
  { title: "Quarterly Performance" },
];

const Performance = ({
  performance,
  id,
  typeIndex = 0,
}: {
  performance: Page_Kocg_Performance;
  id: SectionTypes;
  monthly: MediaItem;
  quarterly: MediaItem;
} & ITypeIndex) => {
  const d = dailyNav[typeIndex];
  const { rateDate } = getDailyData(d);

  const [active, setActive] = useState(perfNav[0].title);

  const monthlyList = getPerfList(typeIndex, monthlyPerf);
  const quarterlyList = getPerfList(typeIndex, quarterlyPerf);

  const toShow = {
    [perfNav[0].title]: monthlyList,
    [perfNav[1].title]: quarterlyList,
  };

  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className="flex flex-col container w-full pb-fis-2 px-4 md:px-fis-1"
      >
        <NavBar
          className="[&>ul>li>a]:text-2xl [&>ul>li>a]:whitespace-nowrap px-0 pt-0"
          navBar={perfNav}
          active={active}
          handleOnClick={(v) => setActive(v)}
        />
        <div>
          <p className="text-slate-600 mb-4">Data as of {rateDate}</p>
          <div className="mb-fis-2 overflow-x-auto">
            <div className="flex flex-col gap-4 w-full min-w-[900px]">
              {toShow[active].map((item, i) => {
                const headerClass = i === 0 ? "!text-black" : "";
                return (
                  <div
                    key={`${item.name}-${i}`}
                    className={classNames("flex gap-2 items-end", {
                      "font-bold [&>div>div>div>span]:text-slate-500 [&>div>div>div>span]:font-normal":
                        i === 0,
                    })}
                  >
                    <div className="w-2/12 text-slate-500">{item.name}</div>
                    <div className="flex w-5/12 gap-2">
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*3)]"
                        )}
                        value={item.oneMo}
                      />
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*3)]"
                        )}
                        value={item.threeMo}
                      />
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*3)]"
                        )}
                        value={item.ytd}
                      />
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*5)]"
                        )}
                        value={item.firstSinceInception}
                      />
                    </div>
                    <div className="flex w-5/12 justify-evenly gap-2">
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*3)]"
                        )}
                        value={item.oneY}
                      />
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*3)]"
                        )}
                        value={item.threeY}
                      />
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*3)]"
                        )}
                        value={item.fiveY}
                      />
                      <Column
                        className={classNames(
                          headerClass,
                          "w-[calc(100%/12*5)]"
                        )}
                        value={item.secondSinceInception}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <span
              className="text-slate-500"
              dangerouslySetInnerHTML={{
                __html: performance.monthlyDisclaimer as string,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const DistributionsMap = [
  {
    "30 Day SEC Yield": "1.19%",
    "Ex-Div Date": ["12/29/2021", "12/29/2022"],
    "Record Date": ["12/30/2021", "12/30/2022"],
    "Payable Date": ["01/03/2022", "01/03/2023"],
    "Amount ($)": ["$0.07221", "$0.39647"],
  },
  {
    "30 Day SEC Yield": "1.56%",
    "Ex-Div Date": ["12/29/2022"],
    "Record Date": ["12/30/2022"],
    "Payable Date": ["01/03/2023"],
    "Amount ($)": ["$0.25961"],
  },
];

const Distributions = ({
  distributions,
  id,
  typeIndex,
}: {
  distributions: string;
  id: SectionTypes;
} & ITypeIndex) => {
  const data = DistributionsMap[typeIndex];

  const d = dailyNav[typeIndex];
  const { rateDate } = getDailyData(d);

  return (
    <div className="flex justify-center w-full bg-slate-100">
      <section
        id={id}
        className="flex flex-col container w-full py-fis-2 px-4 md:px-fis-1"
      >
        <h3 className="text-fis-blue text-2xl mb-4">{distributions}</h3>
        <div className="flex flex-col md:flex-row md:space-x-fis-1">
          <div className="w-full md:w-1/3">
            <div className="w-full max-w-[320px]">
              <SimpleDataTable
                title={`As of ${rateDate}`}
                labelValues={[
                  {
                    label: "30 Day SEC Yeild",
                    value: data["30 Day SEC Yield"],
                  },
                ]}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 mt-fis-1 md:mt-0">
            <div className="bg-white rounded-lg p-8">
              <p className="font-bold text-lg mb-4">As of {rateDate}</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-fis-1 justify-between">
                {[
                  { title: "Ex-Div Date", values: data["Ex-Div Date"] },
                  { title: "Record Date", values: data["Record Date"] },
                  { title: "Payable Date", values: data["Payable Date"] },
                  { title: "Amount ($)", values: data["Amount ($)"] },
                ].map(({ title, values }) => (
                  <SimpleDataTable
                    key={title}
                    title={title}
                    labelValues={values.map((v) => {
                      return { label: "", value: v };
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const radialBg =
  "bg-[radial-gradient(at_bottom_center,rgba(var(--blue)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const filterMap = ["KOCG", "PRAY"];

const getTopHoldingsData = (indexFilter: number) => {
  return topHoldings
    .filter(
      ({ Account }: Record<string, string>) =>
        Account === filterMap[indexFilter]
    )
    .map(({ NAME, IDENTIFIER, Weightings }: Record<string, string>) => {
      return {
        name: NAME,
        ticker: IDENTIFIER,
        weight: Weightings,
      };
    });
};

const Holdings = ({
  holdings,
  id,
  typeIndex = 0,
}: {
  holdings: Page_Kocg_Holdings;
  id: SectionTypes;
} & ITypeIndex) => {
  const items = [
    { name: "", ticker: "Ticker", weight: "Weighting (%)" },
    ...getTopHoldingsData(typeIndex),
  ];

  const data = dailyNav[typeIndex];
  const { rateDate } = getDailyData(data);

  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className={classNames(
          "flex flex-col container w-full py-fis-2 px-4 md:px-fis-1",
          radialBg
        )}
      >
        <div className="flex flex-col mb-fis-1 items-start">
          <div className="flex items-end mb-4">
            <h3
              className="text-fis-blue text-2xl"
              dangerouslySetInnerHTML={{ __html: holdings.title as string }}
            />
            <p className="ml-4 text-slate-600">Data as of {rateDate}</p>
          </div>
          <Button
            href={holdings.download?.url as string}
            variant="tertiary"
            IconButton={<ArrowRight />}
          >
            {holdings.download?.title}
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {items.map(({ name, ticker, weight }, i) => (
            <div key={`${ticker}-${i}`} className="flex justify-between">
              <p className="w-1/2 md:w-1/3 text-slate-500">{name}</p>
              <p
                className={classNames(
                  {
                    "text-fis-purple": i !== 0,
                    "font-bold text-black mb-2": i === 0,
                  },
                  "w-[80px] md:w-1/3"
                )}
              >
                {ticker}
              </p>
              <p
                className={classNames(
                  {
                    "text-fis-purple": i !== 0,
                    "font-bold text-black mb-2": i === 0,
                  },
                  "w-[120px] md:w-1/3"
                )}
              >
                {weight}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const Documents = ({
  documents,
  id,
}: {
  documents: Page_Kocg_Documents;
  id: SectionTypes;
}) => {
  const sections = [
    {
      title: "Legal Documents & Reports",
      items: documents?.legal,
    },
    {
      title: "Fund Resources",
      items: documents?.fundResources,
    },
  ];

  return (
    <div className="flex justify-center relative w-full pb-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[-1]">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <section
            id={id}
            className="flex flex-col container w-full py-fis-2 px-0 md:px-fis-1"
          >
            <h3 className="text-fis-blue text-2xl mb-fis-1">Documents</h3>
            <div className="flex flex-col md:flex-row gap-fis-1">
              {sections.map(({ title, items }) => {
                return (
                  <div key={title} className="w-full md:w-1/2">
                    <h3 className="font-bold text-xl mb-4">{title}</h3>
                    <div className="flex flex-col gap-2 items-start">
                      {items?.map((f) => {
                        return (
                          <Button
                            key={f?.file?.mediaItemUrl as string}
                            href={f?.file?.mediaItemUrl as string}
                            target="_blank"
                            variant="neutral"
                            IconButton={<Pdf />}
                          >
                            {f?.title || f?.file?.title}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </WhiteContainer>
      </div>
    </div>
  );
};

export default function ETF({
  overview,
  pricing,
  performance,
  distributions,
  holdings,
  documents,
  dataReference,
  typeIndex,
}: {
  overview: Page_Kocg_Overview;
  pricing: Page_Kocg_Pricing;
  performance: Page_Kocg_Performance;
  distributions: string;
  holdings: Page_Kocg_Holdings;
  documents: Page_Kocg_Documents;
  dataReference: Page_Kocg_DataReference;
} & ITypeIndex) {
  return (
    <>
      <div className="pt-fis-1" />
      <div className="sticky top-[79px] md:top-[100px] w-full bg-white z-[100] flex justify-center">
        <div className="container">
          <NavBar navBar={navBar} active={undefined} className="pb-0 pt-0" />
        </div>
      </div>
      <div className="pt-fis-1">
        {dataReference.dailyNav && (
          <Overview
            typeIndex={typeIndex}
            overview={overview}
            id="Overview"
            daily={dataReference?.dailyNav}
          />
        )}
      </div>
      <Pricing pricing={pricing} id="Pricing" typeIndex={typeIndex} />
      {dataReference?.monthlyPerformance &&
        dataReference?.quarterlyPerformance && (
          <Performance
            typeIndex={typeIndex}
            performance={performance}
            id="Performance"
            monthly={dataReference.monthlyPerformance}
            quarterly={dataReference.quarterlyPerformance}
          />
        )}
      <Distributions
        distributions={distributions}
        id="Distributions"
        typeIndex={typeIndex}
      />
      <Holdings holdings={holdings} id="Holdings" typeIndex={typeIndex} />
      <Documents documents={documents} id="Documents" />
    </>
  );
}
