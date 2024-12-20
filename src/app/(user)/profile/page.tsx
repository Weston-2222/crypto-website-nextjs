import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FavoriteCoins from './favoriteCoins';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import CoinMasketsCapTable from '@/components/coinMasketsCapTable';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';
export const dynamic = 'force-dynamic';

const Page = async () => {
  const session = await getServerSession(authOptions);
  await connectToDB();
  const user = await User.findOne({ _id: session?.user._id });
  const coinIds = user?.favorites.coins.map((coin) => coin.coin_id).join(',');
  const url = new URL(`${process.env.COINGECKO_API_URL}/coins/markets`);
  url.searchParams.append('vs_currency', 'usd');

  if (!coinIds) return <></>;
  url.searchParams.append('ids', coinIds);

  const favoriteCoinsDataResponse = await fetch(url.toString(), {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COINGECKO_API_KEY || '',
      accept: 'application/json',
    },
  });
  const favoriteCoinsData: CoinsMarketsApiResponse[] =
    await favoriteCoinsDataResponse.json();

  return (
    <Card>
      <CardHeader>
        <CardTitle>收藏的幣種</CardTitle>
        <CardDescription>收藏的幣種</CardDescription>
      </CardHeader>
      <CardContent>
        <FavoriteCoins>
          <CoinMasketsCapTable data={favoriteCoinsData} />
        </FavoriteCoins>
      </CardContent>
      {/* <CardFooter>
        <p></p>
      </CardFooter> */}
    </Card>
  );
};

export default Page;
