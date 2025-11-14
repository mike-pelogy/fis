// eslint-disable-next-line
export const getDailyData = (data: any) => {
  // Return default values if data is undefined or null
  if (!data) {
    return {
      rateDate: '',
      fundTicker: '',
      CUSIP: '',
      netAssets: '',
      shares: '',
      marketPrice: '',
      marketPriceChangeDollars: '',
      marketPriceChangePercentage: '',
      medium30DaySpreadPercentage: '',
      NAV: '',
      NavChangeDollars: '',
      NavChangePercentage: '',
      PremiumDiscountPercentage: '',
      SharesOutstanding: '',
    };
  }

  // Debug logging to see what keys are available in the data
  console.log('getDailyData - Available keys:', Object.keys(data));
  console.log('getDailyData - Full data object:', data);

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
