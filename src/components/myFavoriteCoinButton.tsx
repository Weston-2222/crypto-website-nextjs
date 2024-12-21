'use client';
import 'client-only';

import {
  FavoriteRequest,
  FavoriteResponse,
} from '@/types/api/user/favoriteCoin';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

const fetchFavoriteCoins = async () => {
  const res = await fetch('/api/favorites/coins');
  const data = await res.json();
  return data;
};
const MyFavoriteCoinButton = ({
  coin_id,
  className,
}: {
  coin_id: string;
  className?: string;
}) => {
  const session = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchFavoriteCoins().then((data: FavoriteResponse) => {
      if (data.coins) {
        setIsFavorite(data.coins.some((coin) => coin.coin_id === coin_id));
      }
    });
  }, [session, coin_id]);

  const onClick = ({ method }: { method: 'POST' | 'DELETE' }) => {
    if (!coin_id) {
      return { message: 'Coins are required' };
    }
    const body: FavoriteRequest = {
      coins: [{ coin_id: coin_id }],
    };
    fetch('/api/favorites/coins', {
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      body: JSON.stringify(body),
    }).then((res) => {
      if (res.status === 200) {
        setIsFavorite(!isFavorite);
      }
      return res.json();
    });
  };

  if (isFavorite) {
    return (
      <div
        onClick={() => onClick({ method: 'DELETE' })}
        className={cn(className)}
      >
        <IconStarFilled className='cursor-pointer w-10 h-10' />
      </div>
    );
  }
  return (
    <div onClick={() => onClick({ method: 'POST' })} className={className}>
      <IconStar className='cursor-pointer w-10 h-10' />
    </div>
  );
};

export default MyFavoriteCoinButton;
