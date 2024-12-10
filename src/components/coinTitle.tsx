import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import Image from 'next/image';
import {
  IconArrowBadgeUpFilled,
  IconArrowBadgeDownFilled,
} from '@tabler/icons-react';
import { formatNumberWithCommas } from '@/lib/utils';

export const revalidate = 3600;

const getCoinsMarketsData = async (
  id: string
): Promise<CoinsMarketsApiResponse> => {
  const res = await fetch(
    `${process.env.COINGECKO_API_URL}/coins/markets?vs_currency=usd&ids=${id}`,
    {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINGECKO_API_KEY || '',
        accept: 'application/json',
      },
    }
  );
  const data = await res.json();
  return data[0];
};
const coinTitle = async ({ id }: { id: string }) => {
  const data = await getCoinsMarketsData(id);

  if (!data) {
    return <div>無資料</div>;
  }

  return (
    <div className='m-4'>
      {/* 第一行 */}
      <div className='flex items-center gap-2 m-4'>
        <Image src={data.image} alt={data.name} width={50} height={50} />
        {/* Name and Symbol */}
        <h1 className='text-4xl font-bold'>{data.name}</h1>
        <p className='text-xl text-gray-500'>{data.symbol}</p>
      </div>
      {/* 第二行 */}
      <div className='flex items-center gap-2 m-2'>
        {/* Price */}
        <p className='text-4xl font-bold'>
          USD${formatNumberWithCommas(data.current_price)}
        </p>
        {/* Price Change */}
        {data.price_change_percentage_24h > 0 ? (
          <div className={`flex items-center gap-0.1 text-green-500`}>
            <IconArrowBadgeUpFilled />
            <p>{data.price_change_percentage_24h}%</p>
          </div>
        ) : (
          <div className={`flex items-center gap-0.1 text-red-500`}>
            <IconArrowBadgeDownFilled />
            <p>{data.price_change_percentage_24h}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default coinTitle;
