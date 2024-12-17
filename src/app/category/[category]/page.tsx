import 'server-only';
import CoinMasketsCapTable from '@/components/coinMasketsCapTable';
import {
  fetchCoinCategoryList,
  fetchCoinMarketData,
} from '@/services/coin/coinGecko';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const data: CoinsMarketsApiResponse[] = await fetchCoinMarketData({
    category,
  });
  const categoryList = await fetchCoinCategoryList();
  const categoryName = categoryList.find(
    (item) => item.category_id === category
  )?.name;

  return (
    <div className='py-10'>
      <h1 className='text-3xl p-5'>{categoryName}類別市值排名</h1>
      <CoinMasketsCapTable data={data} />
    </div>
  );
};

export default page;
