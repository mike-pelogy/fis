import React from "react";

const fundTickerMap = [
  { nav: "KOCG NAV", market: "KOCG MKT", mwi: "NDUEACWF" },
];

const getPerfData = (data: any) => {
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

const buildPerfData = ({
  navData,
  marketData,
  MWI,
}: {
  navData: IPerfData;
  marketData: IPerfData;
  MWI: IPerfData;
}) => {
  const {
    oneMonth,
    oneYear,
    threeMonth,
    threeYear,
    fiveYear,
    YTD,
    sinceInceptionAnnualized,
    sinceInceptionCumulative,
  } = navData;

  const {
    oneMonth: moneMonth,
    oneYear: moneYear,
    threeMonth: mthreeMonth,
    threeYear: mthreeYear,
    fiveYear: mfiveYear,
    YTD: mYTD,
    sinceInceptionAnnualized: msinceInceptionAnnualized,
    sinceInceptionCumulative: msinceInceptionCumulative,
  } = marketData;

  const {
    oneMonth: woneMonth,
    oneYear: woneYear,
    threeMonth: wthreeMonth,
    threeYear: wthreeYear,
    fiveYear: wfiveYear,
    YTD: wYTD,
    sinceInceptionAnnualized: wsinceInceptionAnnualized,
    sinceInceptionCumulative: wsinceInceptionCumulative,
  } = MWI;

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
    {
      name: "NAV Performance",
      oneMo: oneMonth,
      threeMo: threeMonth,
      ytd: YTD,
      firstSinceInception: sinceInceptionCumulative,
      oneY: oneYear,
      threeY: threeYear,
      fiveY: fiveYear,
      secondSinceInception: sinceInceptionAnnualized,
    },
    {
      name: "Market Price Performance",
      oneMo: moneMonth,
      threeMo: mthreeMonth,
      ytd: mYTD,
      firstSinceInception: msinceInceptionCumulative,
      oneY: moneYear,
      threeY: mthreeYear,
      fiveY: mfiveYear,
      secondSinceInception: msinceInceptionAnnualized,
    },
    {
      name: "MSCI World Index (Benchmark)",
      oneMo: woneMonth,
      threeMo: wthreeMonth,
      ytd: wYTD,
      firstSinceInception: wsinceInceptionCumulative,
      oneY: woneYear,
      threeY: wthreeYear,
      fiveY: wfiveYear,
      secondSinceInception: wsinceInceptionAnnualized,
    },
  ].map((d): IDateRow => {
    const newObj = {};
    Object.keys(d).forEach((k) => {
      newObj[k] = typeof d[k] === "number" ? `${d[k]}%` : d[k];
    });
    return newObj as IDateRow;
  });
};

const findData = (d: any[], index: number, key: string) => {
  return getPerfData(
    d.find((f) => f["Fund Ticker"] === fundTickerMap[index][key])
  );
};

export const getPerfList = (etfIndex: number, data: any) => {
  const NavData = findData(data, etfIndex, "nav");
  const marketData = findData(data, etfIndex, "market");
  const MWIData = findData(data, etfIndex, "mwi");

  return buildPerfData({
    navData: NavData,
    marketData: marketData,
    MWI: MWIData,
  });
};
