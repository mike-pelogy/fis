import React from "react";

const fundTickerMap = [
  { nav: "KOCG NAV", market: "KOCG MKT", mwi: "NDUEACWF" },
  { nav: "PRAY NAV", market: "PRAY MKT", mwi: "NDDUWI" },
  { nav: "BRIF NAV", market: "BRIF MKT", mwi: "NDDUUS" },
];

// eslint-disable-next-line
const getPerfData = (data: any = {}) => {
  const {
    "1 Month": oneMonth,
    "1 Year": oneYear,
    "3 Month": threeMonth,
    "3 Year": threeYear,
    "5 Year": fiveYear,
    "6 Month": sixMonth,
    YTD,
    Date,
    "Fund Name": fundName,
    "Fund Ticker": fundTicker,
    "Since Inception Annualized": sinceInceptionAnnualized,
    "Since Inception Cumulative": sinceInceptionCumulative,
  } = data;

  return {
    oneMonth,
    oneYear,
    threeMonth,
    threeYear,
    fiveYear,
    sixMonth,
    YTD,
    Date,
    fundName,
    fundTicker,
    sinceInceptionAnnualized,
    sinceInceptionCumulative,
  };
};

type IPerfData = ReturnType<typeof getPerfData>;

interface IDateRow {
  name: string;
  oneMo: string;
  threeMo: string;
  ytd: string;
  firstSinceInception: string;
  oneY: string;
  threeY: string;
  fiveY: string;
  secondSinceInception: string;
}

const msciTypeMap = [
  "MSCI ACWI Index (Benchmark)",
  "MSCI World Index (Benchmark)",
  "MSCI USA Index (Benchmark)",
];

const buildPerfData = ({
  navData,
  marketData,
  MWI,
  index,
}: {
  navData: IPerfData;
  marketData: IPerfData;
  MWI: IPerfData;
  index: number;
}) => {
  const dArray = [
    { name: "NAV Performance", data: navData },
    { name: "Market Price Performance", data: marketData },
    { name: msciTypeMap[index], data: MWI },
  ];

  return [
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
    ...dArray.map(({ name, data }) => {
      const {
        oneMonth,
        oneYear,
        threeMonth,
        threeYear,
        fiveYear,
        YTD,
        sinceInceptionAnnualized,
        sinceInceptionCumulative,
      } = data;

      return {
        name,
        oneMo: oneMonth,
        threeMo: threeMonth,
        ytd: YTD,
        firstSinceInception: sinceInceptionCumulative,
        oneY: oneYear,
        threeY: threeYear,
        fiveY: fiveYear,
        secondSinceInception: sinceInceptionAnnualized,
      };
    }),
  ].map((d): IDateRow => {
    const newObj = {};
    Object.keys(d).forEach((k) => {
      // @ts-expect-error here
      newObj[k] = typeof d[k] === "number" ? `${d[k]}%` : d[k];
    });
    return newObj as IDateRow;
  });
};

// eslint-disable-next-line
const findData = (d: any[], index: number, key: string) => {
  return getPerfData(
    // @ts-expect-error here
    d.find((f) => f["Fund Ticker"] === fundTickerMap[index][key])
  );
};

// eslint-disable-next-line
export const getPerfList = (etfIndex: number, data: any) => {
  const NavData = findData(data, etfIndex, "nav");
  const marketData = findData(data, etfIndex, "market");
  const MWIData = findData(data, etfIndex, "mwi");

  return {
    data: buildPerfData({
      navData: NavData,
      marketData: marketData,
      MWI: MWIData,
      index: etfIndex,
    }),
    date: NavData.Date,
  };
};
