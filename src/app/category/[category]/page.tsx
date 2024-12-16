import CoinMasketsCapTable from '@/components/coinMasketsCapTable';
import { fetchCoinMarketData } from '@/services/coin/coinGecko';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';

const page = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;
  const data: CoinsMarketsApiResponse[] = await fetchCoinMarketData({
    category,
  });

  return <CoinMasketsCapTable data={data} />;
};

export default page;
