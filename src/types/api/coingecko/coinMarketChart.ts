export type CoinMarketChartApiResponse = {
  // [timestamp, price]
  prices: [number, number][];
  // [timestamp, market_cap]
  market_caps: [number, number][];
  // [timestamp, total_volume]
  total_volumes: [number, number][];
};
