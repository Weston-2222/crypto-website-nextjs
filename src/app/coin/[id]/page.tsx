import 'server-only';
import CoinTitle from '@/components/coinTitle';

import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import CoinPriceTabs from './coinPriceTabs';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';

import {
  getDeveloperInfoConfig,
  getLinkInfoConfig,
  getMerketInfoConfig,
} from './contentConfig';
import { fetchCoinData, fetchCoinMarketData } from '@/services/coin/coinGecko';

const CoinPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // 取得幣種資料
  const coinData: CoinInfoApiResponse = await fetchCoinData(id);
  // 取得幣種市場資料
  const coinMarketData: CoinsMarketsApiResponse = await fetchCoinMarketData(id);

  // 取得幣種市場資料設定
  const marketInfoConfig: InfoCardConfig = getMerketInfoConfig(coinMarketData);
  // 取得幣種開發者資料設定
  const developerInfoConfig: InfoCardConfig = getDeveloperInfoConfig(coinData);
  // 取得幣種鏈接資料設定
  const linkInfoConfig: InfoCardConfig = getLinkInfoConfig(coinData);

  return (
    <>
      <div className='w-full'>
        <CoinTitle id={id} />
      </div>

      <div className='flex flex-col xl:flex-row lg:space-x-4 space-y-4 xl:space-y-0 gap-4'>
        {/* 在中小螢幕時 CoinPriceTabs 在上面，正常電腦螢幕時 CoinPriceTabs 在右邊 */}
        <div className='xl:order-2 w-full xl:w-2/3'>
          <CoinPriceTabs coinId={id} symbol={coinData.symbol} />
        </div>

        {/* 在中小螢幕時 CoinBasicInfoCard 在下面，正常電腦螢幕時 CoinBasicInfoCard 在左邊 */}
        <div className='xl:order-1 w-full xl:w-1/3'>
          <InfoCard config={marketInfoConfig} />
          <InfoCard config={linkInfoConfig} />
          <InfoCard config={developerInfoConfig} />
        </div>
      </div>
    </>
  );
};

export default CoinPage;
