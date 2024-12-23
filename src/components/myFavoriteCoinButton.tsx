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
import { toast } from '@/hooks/use-toast';

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
  const postResToast = (res: Response) => {
    switch (res.status) {
      case 201:
        toast({
          title: '收藏成功',
        });
        setIsFavorite(!isFavorite);
        break;
      case 401:
        toast({
          title: '未授權',
        });
        break;
      case 404:
        toast({
          title: '用戶不存在',
        });
        break;
      case 422:
        toast({
          title: '格式錯誤',
        });
        break;
      case 500:
        toast({
          title: '伺服器錯誤',
        });
        break;
    }
  };
  const deleteResToast = (res: Response) => {
    switch (res.status) {
      case 200:
        toast({
          title: '刪除成功',
        });
        setIsFavorite(!isFavorite);
        break;
      case 401:
        toast({
          title: '未授權',
        });
        break;
      case 400:
        toast({
          title: '格式錯誤',
        });
        break;
      case 404:
        toast({
          title: '用戶不存在',
        });
        break;
      case 500:
        toast({
          title: '伺服器錯誤',
        });
        break;
    }
  };
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
      if (method === 'POST') {
        postResToast(res);
      } else {
        deleteResToast(res);
      }
    });
  };

  if (isFavorite) {
    return (
      <div
        onClick={() => onClick({ method: 'DELETE' })}
        className={cn(className)}
      >
        <IconStarFilled className='cursor-pointer w-10 h-10 text-yellow-500' />
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
