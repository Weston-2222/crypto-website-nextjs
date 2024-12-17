import 'server-only';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { fetchCoinData } from '@/services/coin/coinGecko';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import { getLinkInfoConfig } from '../contentConfig';

const LinkInfo = async ({ id }: { id: string }) => {
  // 取得幣種資料
  const coinData: CoinInfoApiResponse = await fetchCoinData(id);
  // 取得幣種鏈接資料設定
  const linkInfoConfig: InfoCardConfig = getLinkInfoConfig(coinData);

  return <InfoCard config={linkInfoConfig} />;
};

export default LinkInfo;
