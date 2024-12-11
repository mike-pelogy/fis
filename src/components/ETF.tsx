import React from "react";
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
import { useEffect, useState } from "react";
import FunBackground from "./FunBackground";
import WhiteContainer from "./WhiteContainer";
import { NavBar } from "./NavBar";
import ArrowRight from "@/svgs/ArrowRight";
import Pdf from "@/svgs/Pdf";

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
      <section className="container px-4 md:px-fis-1" id={id}>
        <div className="flex flex-col md:flex-row pb-fis-2">
          <div className="w-full md:w-2/3 pr-0 md:pr-fis-4">
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
          <div className="w-full md:w-1/3 mt-fis-2 md:mt-0">
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
                    IconButton={<Pdf />}
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
        className="flex flex-col container w-full py-fis-2 px-4 md:px-fis-1"
      >
        <div className="flex items-end mb-fis-1">
          <h3
            className="text-fis-blue text-2xl"
            dangerouslySetInnerHTML={{ __html: pricing.title as string }}
          />
          <p className="ml-4 text-slate-600">data as of</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-fis-1">
          <div className="w-full md:w-1/3">
            <SimpleDataTable
              className="rounded-lg bg-slate-100 p-8"
              title="Closing NAV Price"
              labelValues={[
                { label: "Net Asset Value", value: "$27.45" },
                { label: "Net Asset Value", value: "$27.45" },
              ]}
            />
          </div>
          <div className="w-full md:w-1/3">
            <SimpleDataTable
              className="rounded-lg p-8"
              title="Closing Market Price"
              labelValues={[
                { label: "Net Asset Value", value: "$27.45" },
                { label: "Net Asset Value", value: "$27.45" },
              ]}
            />
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-start">
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

const perfItems = [
  {
    name: "",
    oneMo: "1 Mo",
    threeMo: "3 Mo",
    ytd: "YTD",
    firstSinceInception: (
      <div>
        <span>Cumulative</span>
        <div>Since Inception</div>
      </div>
    ),
    oneY: "1 Yr",
    threeY: "3 Yr",
    fiveY: "5 Yr",
    secondSinceInception: (
      <div>
        <span>Annualized</span>
        <div>Since Inception</div>
      </div>
    ),
  },
  {
    name: "Nav Performance",
    oneMo: "3.47%",
    threeMo: "9.08%",
    ytd: "12.78%",
    firstSinceInception: "17.68%",
    oneY: "3.47%",
    threeY: "",
    fiveY: "",
    secondSinceInception: "6.79%",
  },
  {
    name: "Nav Performance",
    oneMo: "3.47%",
    threeMo: "9.08%",
    ytd: "12.78%",
    firstSinceInception: "17.68%",
    oneY: "3.47%",
    threeY: "",
    fiveY: "",
    secondSinceInception: "6.79%",
  },
  {
    name: "Nav Performance",
    oneMo: "3.47%",
    threeMo: "9.08%",
    ytd: "12.78%",
    firstSinceInception: "17.68%",
    oneY: "3.47%",
    threeY: "",
    fiveY: "",
    secondSinceInception: "6.79%",
  },
];

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

  const nav = [
    { title: "Monthly Performance" },
    { title: "Quarterly Performance" },
  ];

  const [active, setActive] = useState(nav[0].title);
  // TODO: sync up active tab with correct data

  return (
    <div className="flex justify-center w-full">
      <section
        id={id}
        className="flex flex-col container w-full pb-fis-2 px-4 md:px-fis-1"
      >
        <NavBar
          className="[&>ul>li>a]:text-2xl [&>ul>li>a]:whitespace-nowrap px-0 pt-0"
          navBar={nav}
          active={active}
          handleOnClick={(v) => setActive(v)}
        />
        <div>
          <p className="text-slate-600 mb-4">data as of</p>
          <div className="mb-fis-2 overflow-x-auto">
            <div className="flex flex-col gap-4 w-full min-w-[900px]">
              {perfItems.map((item, i) => {
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
        className="flex flex-col container w-full py-fis-2 px-4 md:px-fis-1"
      >
        <h3 className="text-fis-blue text-2xl mb-4">{distributions}</h3>
        <div className="flex flex-col md:flex-row md:space-x-fis-1">
          <div className="w-full md:w-1/3">
            <div className="w-full max-w-[320px]">
              <SimpleDataTable
                title="As of DATE"
                labelValues={[{ label: "30 Day SEC Yeild", value: "1.56%" }]}
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 mt-fis-1 md:mt-0">
            <div className="bg-white rounded-lg p-8">
              <p className="font-bold text-lg mb-4">As of DATE</p>
              <div className="flex flex-col md:flex-row gap-4 md:gap-fis-1 justify-between">
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
            <p className="ml-4 text-slate-600">data as of</p>
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
            <div key={ticker} className="flex justify-between">
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
                    {items?.map((f) => {
                      return (
                        <Button
                          key={f?.file?.mediaItemUrl as string}
                          href={f?.file?.mediaItemUrl as string}
                          variant="neutral"
                          IconButton={<Pdf />}
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
