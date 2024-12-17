import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { fetchCoinData } from '@/services/coin/coinGecko';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import 'server-only';
import { getDeveloperInfoConfig } from '../contentConfig';

const DeveloperInfo = async ({ id }: { id: string }) => {
  // 取得幣種資料
  const coinData: CoinInfoApiResponse = await fetchCoinData(id);

  // 取得幣種開發者資料設定
  const developerInfoConfig: InfoCardConfig = getDeveloperInfoConfig(coinData);

  return <InfoCard config={developerInfoConfig} />;
};

export default DeveloperInfo;
