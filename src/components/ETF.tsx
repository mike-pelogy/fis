import Button from "@/components/Button";
import useFetch from "@/data/useFetch";
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
import { useEffect } from "react";
import FunBackground from "./FunBackground";
import WhiteContainer from "./WhiteContainer";

type SectionTypes =
  | "Overview"
  | "Pricing"
  | "Performance"
  | "Distributions"
  | "Holdings"
  | "Documents";

interface INavBar {
  title: string;
}

const navBar: INavBar[] = [
  { title: "Overview" },
  { title: "Pricing" },
  { title: "Performance" },
  { title: "Distributions" },
  { title: "Holdings" },
  { title: "Documents" },
];

const NavBar = ({
  navBar,
  className,
}: {
  navBar: INavBar[];
  className?: string;
}) => (
  <div className={classNames("container py-fis-1", className)}>
    <ul className="w-full border-b-[1px] border-slate-100 flex gap-6">
      {navBar.map(({ title }) => (
        <li key={title} className="leading-[0]">
          <a
            className="text-lg text-fis-blue block leading-[2em] hover:text-fis-purple transition-all hover:border-fis-purple border-b-2 border-transparent"
            href={`#${title}`}
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Overview = ({
  overview,
  id,
  daily,
}: {
  overview: Page_Kocg_Overview;
  id: SectionTypes;
  daily: MediaItem;
}) => {
  const { data, error } = useFetch(daily.mediaItemUrl || "");

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // TODO: use data for dynamic table
  console.log(data);

  return (
    <div className="flex justify-center pt-fis-1">
      <section className="container px-fis-1" id={id}>
        <div className="flex pb-fis-2">
          <div className="w-2/3 pr-fis-4">
            <h3
              className="text-fis-blue text-2xl mb-4"
              dangerouslySetInnerHTML={{ __html: overview.title as string }}
            />
            <div
              className="[&>ol]:space-y-fis-1 [&>ol>li]:pl-fis-2 [&>ol>li]:relative [&>ol>li]:[counter-increment:section] [&>ol>li]:before:[content:counters(section,'.')] [&>ol>li]:before:text-fis-blue [&>ol>li]:before:text-3xl [&>ol>li]:before:absolute [&>ol>li]:before:left-0 [&>ol>li]:before:top-0 [&>ol>li]:before:font-bold"
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
          <div className="w-1/3">
            <div className="rounded-lg bg-slate-50 p-8 flex flex-col gap-2">
              <div className="flex justify-between">
                <p className="font-bold text-lg">Funding Details</p>
                <p className="font-bold text-lg">As of DATE</p>
              </div>
              {[
                { title: "Fund Inception", value: "7/14/2021" },
                { title: "Fund Ticker", value: "KOCG" },
                { title: "Fund Inception", value: "7/14/2021" },
                { title: "Fund Ticker", value: "KOCG" },
                { title: "Fund Inception", value: "7/14/2021" },
                { title: "Fund Ticker", value: "KOCG" },
                { title: "Fund Inception", value: "7/14/2021" },
                { title: "Fund Ticker", value: "KOCG" },
                { title: "Fund Inception", value: "7/14/2021" },
                { title: "Fund Ticker", value: "KOCG" },
              ].map(({ title, value }) => {
                return (
                  <div key={title} className="flex justify-between">
                    <p className="text-slate-500">{title}</p>
                    <p className="text-fis-purple">{value}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8">
              <h4 className="font-bold text-lg mb-4">Fund Resources</h4>
              {overview?.fundResources?.map((f) => {
                return (
                  <Button
                    key={f?.file?.mediaItemUrl as string}
                    href={f?.file?.mediaItemUrl as string}
                    variant="neutral"
                  >
                    {f?.title}
                  </Button>
                );
              })}
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
              {label && <p className="text-slate-500">{label}</p>}
              {value && <p className="text-fis-purple">{value}</p>}
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
}: {
  pricing: Page_Kocg_Pricing;
  id: SectionTypes;
}) => {
  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className="flex flex-col container w-full py-fis-2 px-fis-1"
      >
        <div className="flex items-end mb-fis-1">
          <h3
            className="text-fis-blue text-2xl"
            dangerouslySetInnerHTML={{ __html: pricing.title as string }}
          />
          <p className="ml-4 text-slate-600">data as of</p>
        </div>
        <div className="flex space-x-fis-1">
          <div className="w-1/3">
            <SimpleDataTable
              className="rounded-lg bg-slate-100 p-8"
              title="Closing NAV Price"
              labelValues={[
                { label: "Net Asset Value", value: "$27.45" },
                { label: "Net Asset Value", value: "$27.45" },
              ]}
            />
          </div>
          <div className="w-1/3">
            <SimpleDataTable
              className="rounded-lg p-8"
              title="Closing Market Price"
              labelValues={[
                { label: "Net Asset Value", value: "$27.45" },
                { label: "Net Asset Value", value: "$27.45" },
              ]}
            />
          </div>
          <div className="w-1/3 flex flex-col items-start">
            <SimpleDataTable
              className="rounded-lg bg-slate-100 p-8 mb-8 w-full"
              title="Premium / Discount"
              labelValues={[
                { label: "Net Asset Value", value: "$27.45" },
                { label: "Net Asset Value", value: "$27.45" },
              ]}
            />
            <Button
              href={pricing.premiumOrDiscountInfo?.url as string}
              variant="secondary"
            >
              {pricing.premiumOrDiscountInfo?.title}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const Performance = ({
  performance,
  id,
  monthly,
  quarterly,
}: {
  performance: Page_Kocg_Performance;
  id: SectionTypes;
  monthly: MediaItem;
  quarterly: MediaItem;
}) => {
  const { data: monthlyData, error: monthlyError } = useFetch(
    monthly.mediaItemUrl || ""
  );
  const { data: quarterlyData, error: quarterlyError } = useFetch(
    quarterly.mediaItemUrl || ""
  );

  useEffect(() => {
    if (monthlyData) {
      console.error(monthlyError);
    }
    if (quarterlyError) {
      console.error(quarterlyError);
    }
  }, [monthlyError, quarterlyError]);

  // TODO: use data for dynamic table
  console.log(monthlyData, quarterlyData);

  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className="flex flex-col container w-full pb-fis-2 px-fis-1"
      >
        <NavBar
          className="[&>ul>li>a]:text-2xl"
          navBar={[
            { title: "Monthly Performance" },
            { title: "Quarterly Performance" },
          ]}
        />
        <div>
          <p className="text-slate-600">data as of</p>
          <div>table goes here</div>
          <div>
            <span
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

const Distributions = ({
  distributions,
  id,
}: {
  distributions: string;
  id: SectionTypes;
}) => {
  return (
    <div className="flex justify-center w-full bg-slate-100">
      <section
        id={id}
        className="flex flex-col container w-full py-fis-2 px-fis-1"
      >
        <h3 className="text-fis-blue text-2xl mb-4">{distributions}</h3>
        <div className="flex space-x-fis-1">
          <div className="w-1/3">
            <div className="w-full max-w-[320px]">
              <SimpleDataTable
                title="As of DATE"
                labelValues={[{ label: "30 Day SEC Yeild", value: "1.56%" }]}
              />
            </div>
          </div>
          <div className="w-2/3">
            <div className="bg-white rounded-lg p-8">
              <p className="font-bold text-lg mb-4">As of DATE</p>
              <div className="flex space-x-fis-l justify-between">
                {[
                  { title: "Ex-Div Date", value: "12/29/2022" },
                  { title: "Record Date", value: "12/29/2022" },
                  { title: "Payable Date", value: "12/29/2022" },
                  { title: "Amount ($)", value: "12/29/2022" },
                ].map(({ title, value }) => (
                  <SimpleDataTable
                    key={title}
                    title={title}
                    labelValues={[{ label: "", value }]}
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

const Holdings = ({
  holdings,
  id,
  top10,
}: {
  holdings: Page_Kocg_Holdings;
  id: SectionTypes;
  top10: MediaItem;
}) => {
  const { data, error } = useFetch(top10.mediaItemUrl || "");

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // TODO: use data for dynamic table
  console.log(data);

  const items = [
    { name: "", ticker: "Ticker", weight: "Weighting (%)" },
    { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
    { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
    { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
    { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
    { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
    { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
    { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
    { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
    { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
    { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
    { name: "Microsoft Corp", ticker: "MSFT", weight: "4.88%" },
    { name: "Nvidia Corp", ticker: "NVDA", weight: "4.65%" },
  ];

  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className={classNames("flex flex-col container w-full py-fis-2 px-fis-1", radialBg)}
      >
        <div className="flex flex-col mb-fis-1 items-start">
          <div className="flex items-end mb-4">
            <h3
              className="text-fis-blue text-2xl"
              dangerouslySetInnerHTML={{ __html: holdings.title as string }}
            />
            <p className="ml-4 text-slate-600">data as of</p>
          </div>
          <Button href={holdings.download?.url as string} variant="tertiary">
            {holdings.download?.title}
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          {items.map(({ name, ticker, weight }, i) => (
            <div key={ticker} className="flex justify-between">
              <p className="w-1/3 text-slate-500">{name}</p>
              <p
                className={classNames(
                  {
                    "text-fis-purple": i !== 0,
                    "font-bold text-black mb-2": i === 0,
                  },
                  "w-1/3"
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
                  "w-1/3"
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
    <div className="flex justify-center relative w-full pt-fis-2 pb-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 bottom-0 bg-fis-blue/10 z-[-1]">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <section
            id={id}
            className="flex flex-col container w-full py-fis-2 px-fis-1"
          >
            <h3 className="text-fis-blue text-2xl mb-fis-1">Documents</h3>
            <div className="flex space-x-fis-1">
              {sections.map(({ title, items }) => {
                return (
                  <div key={title} className="w-1/2">
                    <h3 className="font-bold text-xl mb-4">{title}</h3>
                    {items?.map((f) => {
                      return (
                        <Button
                          key={f?.file?.mediaItemUrl as string}
                          href={f?.file?.mediaItemUrl as string}
                          variant="neutral"
                        >
                          {f?.title || f?.file?.title}
                        </Button>
                      );
                    })}
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
}: {
  overview: Page_Kocg_Overview;
  pricing: Page_Kocg_Pricing;
  performance: Page_Kocg_Performance;
  distributions: string;
  holdings: Page_Kocg_Holdings;
  documents: Page_Kocg_Documents;
  dataReference: Page_Kocg_DataReference;
}) {
  return (
    <>
      <NavBar navBar={navBar} />
      {dataReference?.daily && (
        <Overview
          overview={overview}
          id="Overview"
          daily={dataReference.daily}
        />
      )}
      <Pricing pricing={pricing} id="Pricing" />
      {dataReference?.monthly && dataReference?.quarterly && (
        <Performance
          performance={performance}
          id="Performance"
          monthly={dataReference.monthly}
          quarterly={dataReference.quarterly}
        />
      )}
      <Distributions distributions={distributions} id="Distributions" />
      {dataReference?.top10Holdings && (
        <Holdings
          holdings={holdings}
          id="Holdings"
          top10={dataReference.top10Holdings}
        />
      )}
      <Documents documents={documents} id="Documents" />
    </>
  );
}
