'use client';
import 'client-only';
import { Button } from './ui/button';
import {
  FavoriteRequest,
  FavoriteResponse,
} from '@/types/api/user/favoriteCoin';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { IconStar, IconStarFilled } from '@tabler/icons-react';

const MyFavoriteCoinButton = ({ coin_id }: { coin_id: string }) => {
  const session = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    setIsFavorite(
      session.data?.user.favorites.coins.some(
        (coin) => coin.coin_id === coin_id
      )
    );
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
    })
      .then((res) => {
        if (res.status === 200) {
          setIsFavorite(!isFavorite);
        }
        return res.json();
      })
      .then((data: FavoriteResponse) => {
        console.log(data);
      });
  };

  if (isFavorite) {
    return (
      <div onClick={() => onClick({ method: 'DELETE' })}>
        <IconStarFilled />
      </div>
    );
  }
  return (
    <div onClick={() => onClick({ method: 'POST' })}>
      <IconStar />
    </div>
  );
};

export default MyFavoriteCoinButton;
