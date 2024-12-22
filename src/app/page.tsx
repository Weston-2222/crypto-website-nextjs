import 'server-only';
import React from 'react';
import CoinMasketsCapTable from '../components/coinMasketsCapTable';
import { getCoinMarketsData } from '@/services/coinGecko/coinMarkets';
import LoginDialog from '@/components/loginDialog';

export const revalidate = 3600; // 每小時重新生成靜態頁面（3600 秒）

const Page = async ({
  searchParams,
}: {
  searchParams: { isOpenLoginDialog: string };
}) => {
  try {
    const params = await searchParams;
    const data = await getCoinMarketsData();

    return (
      <>
        <LoginDialog
          defaultOpen={params.isOpenLoginDialog == 'true'}
          isIcon={false}
        />
        <div className='container mx-auto p-0 bg-gray-100 dark:bg-black'>
          <h1 className='text-3xl p-5'>市值排名</h1>
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
