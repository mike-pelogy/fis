// eslint-disable-next-line
export const getDailyData = (data: any) => {
  const {
    "Rate Date": rateDate,
    "Fund Ticker": fundTicker,
    CUSIP,
    "Net Assets": netAssets,
    "Shares Outstanding": shares,
    "Market Price": marketPrice,
    "Market Price Change Dollars": marketPriceChangeDollars,
    "Market Price Change Percentage": marketPriceChangePercentage,
    "Median 30 Day Spread Percentage": medium30DaySpreadPercentage,
    NAV,
    "NAV Change Dollars": NavChangeDollars,
    "NAV Change Percentage": NavChangePercentage,
    "Premium/Discount Percentage": PremiumDiscountPercentage,
    "Shares Outstanding": SharesOutstanding,
  } = data;

  return {
    rateDate,
    fundTicker,
    CUSIP,
    netAssets,
    shares,
    marketPrice,
    marketPriceChangeDollars,
    marketPriceChangePercentage,
    medium30DaySpreadPercentage,
    NAV,
    NavChangeDollars,
    NavChangePercentage,
    PremiumDiscountPercentage,
    SharesOutstanding,
  };
};
