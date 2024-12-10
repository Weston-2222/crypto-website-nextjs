// app/page.tsx

import { DataTable } from '@/components/coinsMarketsCapTable';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';
import React from 'react';

export const revalidate = 3600; // 每小時重新生成靜態頁面（3600 秒）

const Page = async () => {
  try {
    const res = await fetch(
      `${process.env.COINGECKO_API_URL}/coins/markets?vs_currency=usd`,
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINGECKO_API_KEY || '',
          accept: 'application/json',
        },
        next: { revalidate }, // 啟用 ISR
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP 錯誤！狀態碼：${res.status}`);
    }

    const data: CoinsMarketsApiResponse[] = await res.json();

    const nameAndSymbol = data.map((item) => ({
      ...item,
      name_symbol: `${item.name}_${item.symbol}`,
    }));

    return (
      <div className='container mx-auto py-10'>
        <DataTable data={nameAndSymbol} />
      </div>
    );
  } catch (error) {
    return (
      <div className='container mx-auto py-10'>
        <p>無法獲取數據，請稍後重試。</p>
      </div>
    );
  }
};

export default Page;
