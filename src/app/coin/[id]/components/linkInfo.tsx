import 'server-only';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { getCoinBasicData } from '@/services/coinGecko/coinBasic';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import { getLinkInfoConfig } from '../contentConfig';

const LinkInfo = async ({ id }: { id: string }) => {
  // 取得幣種資料
  try {
    const coinData: CoinInfoApiResponse = await getCoinBasicData(id);

    // 取得幣種鏈接資料設定
    const linkInfoConfig: InfoCardConfig = getLinkInfoConfig(coinData);

    return <InfoCard config={linkInfoConfig} />;
  } catch {
    return <p>無法取得鏈接資料</p>;
  }
};

export default LinkInfo;
