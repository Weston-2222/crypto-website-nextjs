import 'server-only';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { getCoinMarketsData } from '@/services/coinGecko/coinMarkets';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { getMerketInfoConfig } from '../contentConfig';

const MarketInfo = async ({ id }: { id: string }) => {
  // 取得幣種市場資料
  try {
    const coinMarketData: CoinsMarketsApiResponse[] = await getCoinMarketsData({
      ids: [id],
    });

    // 取得幣種市場資料設定
    const marketInfoConfig: InfoCardConfig = getMerketInfoConfig(
      coinMarketData[0]
    );
    return <InfoCard config={marketInfoConfig} />;
  } catch {
    return <p>無法取得市場資料</p>;
  }
};

export default MarketInfo;
