import 'server-only';
import InfoCard, { InfoCardConfig } from '@/components/infoCard';
import { getCoinBasicData } from '@/services/coinGecko/coinBasic';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import { getCategoryInfoConfig } from '../contentConfig';

const CategoryInfo = async ({ id }: { id: string }) => {
  try {
    const coinData: CoinInfoApiResponse = await getCoinBasicData(id);

    const categoryInfoConfig: InfoCardConfig = await getCategoryInfoConfig(
      coinData
    );

    return <InfoCard config={categoryInfoConfig} />;
  } catch {
    return <p>無法取得分類資料</p>;
  }
};

export default CategoryInfo;
