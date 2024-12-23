import 'server-only';
import CoinMasketsCapTable from '@/components/coinMasketsCapTable';
import { getCoinMarketsData } from '@/services/coinGecko/coinMarkets';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import { getCoinCategoryList } from '@/services/coinGecko/categoriesList';
export const revalidate = 86400;
const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  try {
    const data: CoinsMarketsApiResponse[] = await getCoinMarketsData({
      category,
    });
    const categoryList = await getCoinCategoryList();
    const categoryName = categoryList.find(
      (item) => item.category_id === category
    )?.name;

    return (
      <div className='py-10'>
        <h1 className='text-3xl p-5'>{categoryName}類別市值排名</h1>
        <CoinMasketsCapTable data={data} />
      </div>
    );
  } catch {
    return <p>無法取得類別市值排名</p>;
  }
};

export default page;
