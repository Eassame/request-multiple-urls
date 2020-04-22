const axios = require("axios");

//mock data from each api call
const { FTSE, GBPHKD, GBPUSD } = require("../__mocks__/mockData.js");
//Needed to mock axios
jest.mock("axios");

//Module being tested
const requestMultipleUrls = require("./requestMultipleUrls");

const finalVal = [
  {
    symbolInput: "FTSE:FSI",
    basic: {
      symbol: "FTSE:FSI",
      name: "FTSE 100 Index",
      exchange: "FTSE International",
      exhangeCode: "FSI",
      bridgeExchangeCode: "GBFT",
      currency: "GBP",
    },
    quote: {
      lastPrice: 7259.31,
      openPrice: 7292.76,
      high: 7335.55,
      low: 7258.83,
      previousClosePrice: 7292.76,
      change1Day: -33.44999999999982,
      change1DayPercent: -0.45867408224046613,
      change1Week: -100.06999999999971,
      change1WeekPercent: -1.359761284238614,
      timeStamp: "2019-11-15T10:53:16",
      volume: 165239344,
    },
  },
  {
    symbolInput: "GBPHKD",
    basic: {
      symbol: "GBPHKD",
      name: "UK Pound Sterling/Hong Kong Dollar FX Cross Rate",
      exchange: "SOURCE IS A THOMSON REUTERS CONTRIBUTOR",
      exhangeCode: "RCT",
      bridgeExchangeCode: "CUX",
    },
    quote: {
      lastPrice: 10.081900000000001,
      openPrice: 10.081800000000001,
      high: 10.0901,
      low: 10.0738,
      closePrice: 10.081800000000001,
      previousClosePrice: 10.081800000000001,
      change1Day: 0.00009999999999976694,
      change1DayPercent: 0.0009918863694951985,
      change1Week: 0.08480000000000132,
      change1WeekPercent: 0.848245991337501,
      ask: 10.0829,
      bid: 10.081900000000001,
      timeStamp: "2019-11-15T10:30:00",
      volume: 0,
    },
  },
  {
    symbolInput: "GBPUSD",
    basic: {
      symbol: "GBPUSD",
      name: "UK Pound Sterling/US Dollar FX Spot Rate",
      exchange: "SOURCE IS A THOMSON REUTERS CONTRIBUTOR",
      exhangeCode: "RCT",
      bridgeExchangeCode: "CUX",
    },
    quote: {
      lastPrice: 1.2879,
      openPrice: 1.2881,
      high: 1.2887,
      low: 1.2868000000000002,
      closePrice: 1.2881,
      previousClosePrice: 1.2881,
      change1Day: -0.00019999999999997797,
      change1DayPercent: -0.015526744817947207,
      change1Week: 0.010700000000000154,
      change1WeekPercent: 0.8377701221421981,
      ask: 1.288,
      bid: 1.2879,
      timeStamp: "2019-11-15T10:30:00",
      volume: 0,
    },
  },
];

const urls = ["/ftse-fsi.json", "/gbp-hkd.json", "/gbp-usd.json"];

axios.get.mockResolvedValue((url) => {
  switch (url) {
    case "/ftse-fsi.json":
      return Promise.resolve({ data: FTSE });
    case "/gbp-hkd.json":
      return Promise.resolve({ data: GBPHKD });
    case "/gbp-usd.json":
      return Promise.resolve({ data: GBPUSD });
    default:
      return undefined;
  }
});

describe("requestMultipleUrls Package", () => {
  it("array of valid urls returns a promise", async (done) => {
    requestMultipleUrls(urls).then((data) => {
      expect(data).toEqual(finalVal);
    });
  });
});
