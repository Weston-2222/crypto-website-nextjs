import { DataTable } from '@/components/coinsMarketsTable';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';

export const revalidate = 3600;

const getCoinsMarketsData = async () => {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
    {
      headers: {
        'X-CMC_PRO_API_KEY': '3adfd9a8-73f6-4cd0-a604-e0ac66775d63',
        accept: 'application/json',
      },
    }
  );
  const data = await res.json();

  return data.map((item: CoinsMarketsApiResponse) => ({
    ...item,
    nameAndSymbol: `${item.name} (${item.symbol})`,
  }));
};

const page = async () => {
  type Payment = {
    id: string;
    nameAndSymbol: string;
    market_cap_rank: number;
    market_cap: number;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
  };
  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: 'market_cap_rank',
      header: '市值排名',
    },
    {
      accessorKey: 'image',
      header: '',
    },
    {
      accessorKey: 'nameAndSymbol',
      header: '貨幣',
    },

    {
      accessorKey: 'current_price',
      header: '價格',
    },
    {
      accessorKey: 'price_change_percentage_24h',
      header: '24小時漲幅',
    },
    {
      accessorKey: 'market_cap',
      header: '市值',
    },
  ];
  const data = await getCoinsMarketsData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default page;
