import 'server-only';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { fetchCoinData } from '@/services/coin/coinGecko';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import { getCategoryInfoConfig } from '../contentConfig';

const CategoryInfo = async ({ id }: { id: string }) => {
  const coinData: CoinInfoApiResponse = await fetchCoinData(id);
  const categoryInfoConfig: InfoCardConfig = await getCategoryInfoConfig(
    coinData
  );

  return <InfoCard config={categoryInfoConfig} />;
};

export default CategoryInfo;
