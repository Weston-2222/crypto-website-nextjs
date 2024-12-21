import 'server-only';
import { getCoinBasicData } from '@/services/coinGecko/coinBasic';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';

import CoinPriceTabs from './coinPriceTabs';

const PriceChart = async ({ id }: { id: string }) => {
  try {
    const coinData: CoinInfoApiResponse = await getCoinBasicData(id);

    return <CoinPriceTabs coinId={id} symbol={coinData.symbol} />;
  } catch {
    return <p>無法取得價格資料</p>;
  }
};

export default PriceChart;
