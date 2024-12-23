import 'server-only';
import React from 'react';
import CoinMasketsCapTable from '../components/coinMasketsCapTable';
import { getCoinMarketsData } from '@/services/coinGecko/coinMarkets';

export const revalidate = 60; // 每小時重新生成靜態頁面（3600 秒）

const Page = async () => {
  try {
    const data = await getCoinMarketsData();

    return (
      <>
        <div className='container mx-auto p-0'>
          <h1 className='text-3xl p-2'>市值排名</h1>
          <CoinMasketsCapTable data={data} />
        </div>
      </>
    );
  } catch {
    return (
      <div className='container mx-auto py-10'>
        <p>無法獲取數據，請稍後重試。</p>
      </div>
    );
  }
};

export default Page;
