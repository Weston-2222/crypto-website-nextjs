import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import 'server-only';
import Reload from './reload';

import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCoinMarketsData } from '@/services/coinGecko/coinMarkets';
import CoinMasketsCapTable from '@/components/coinMasketsCapTable';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';

const FavoriteCoins = async () => {
  const session = await getServerSession(authOptions);
  await connectToDB();
  const user = await User.findById(session?.user._id);
  const coinIds = user?.favorites.coins.reduce((arr, coin) => {
    arr.push(coin.coin_id);
    return arr;
  }, [] as string[]);
  let data: CoinsMarketsApiResponse[] | null = null;
  if (coinIds && coinIds.length > 0) {
    data = await getCoinMarketsData({
      ids: coinIds,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>收藏的幣種</CardTitle>
        <CardDescription>收藏的幣種</CardDescription>
      </CardHeader>
      <CardContent>
        <Reload />
        {data ? <CoinMasketsCapTable data={data} /> : <p>沒有收藏任何幣種</p>}
      </CardContent>
      {/* <CardFooter>
    <p></p>
  </CardFooter> */}
    </Card>
  );
};

export default FavoriteCoins;
