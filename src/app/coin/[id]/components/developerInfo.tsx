import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { getCoinBasicData } from '@/services/coinGecko/coinBasic';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import 'server-only';
import { getDeveloperInfoConfig } from '../contentConfig';

const DeveloperInfo = async ({ id }: { id: string }) => {
  // 取得幣種資料
  try {
    const coinData: CoinInfoApiResponse = await getCoinBasicData(id);

    // 取得幣種開發者資料設定
    const developerInfoConfig: InfoCardConfig =
      getDeveloperInfoConfig(coinData);

    return <InfoCard config={developerInfoConfig} />;
  } catch {
    return <p>無法取得開發者資料</p>;
  }
};

export default DeveloperInfo;
