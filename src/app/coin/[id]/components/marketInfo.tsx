import 'server-only';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { fetchCoinMarketData } from '@/services/coin/coinGecko';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { getMerketInfoConfig } from '../contentConfig';

const MarketInfo = async ({ id }: { id: string }) => {
  // 取得幣種市場資料
  const coinMarketData: CoinsMarketsApiResponse[] = await fetchCoinMarketData({
    id,
  });

  // 取得幣種市場資料設定
  const marketInfoConfig: InfoCardConfig = getMerketInfoConfig(
    coinMarketData[0]
  );
  return <InfoCard config={marketInfoConfig} />;
};

export default MarketInfo;
