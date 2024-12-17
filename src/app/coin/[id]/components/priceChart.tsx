import 'server-only';
import { fetchCoinData } from '@/services/coin/coinGecko';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';

import CoinPriceTabs from './coinPriceTabs';

const PriceChart = async ({ id }: { id: string }) => {
  const coinData: CoinInfoApiResponse = await fetchCoinData(id);

  return <CoinPriceTabs coinId={id} symbol={coinData.symbol} />;
};

export default PriceChart;
