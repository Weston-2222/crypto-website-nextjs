import 'server-only';
import CoinTitle from './components/coinTitle';
import { Suspense } from 'react';
import MarketInfo from './components/marketInfo';
import Loading from '@/components/loading';
import LinkInfo from './components/linkInfo';
import DeveloperInfo from './components/developerInfo';
import CategoryInfo from './components/categoryInfo';
import PriceChart from './components/priceChart';
export const revalidate = 60;
const CoinPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <>
      <div className='w-full'>
        <div>
          <Suspense
            fallback={
              <Loading
                loadingSize='w-20 h-20'
                className='h-[100px] w-[400px]'
              />
            }
          >
            <CoinTitle id={id} />
          </Suspense>
        </div>
      </div>
      <div className='flex flex-col xl:flex-row lg:space-x-4 space-y-4 xl:space-y-0 gap-4'>
        {/* 在中小螢幕時 CoinPriceTabs 在上面，正常電腦螢幕時 CoinPriceTabs 在右邊 */}
        <div className='xl:order-2 w-full xl:w-2/3'>
          <Suspense
            fallback={<Loading className='h-[600px]' loadingSize='w-20 h-20' />}
          >
            <PriceChart id={id} />
          </Suspense>

          {/* 市場資料 */}
          <Suspense
            fallback={<Loading className='h-1/2' loadingSize='w-20 h-20' />}
          >
            <CategoryInfo id={id} />
          </Suspense>
        </div>

        {/* 在中小螢幕時 CoinBasicInfoCard 在下面，正常電腦螢幕時 CoinBasicInfoCard 在左邊 */}
        <div className='xl:order-1 w-full xl:w-1/3'>
          {/* 市場資料 */}
          <Suspense
            fallback={<Loading className='h-[500px]' loadingSize='w-20 h-20' />}
          >
            <MarketInfo id={id} />
          </Suspense>

          {/* 鏈接資料 */}
          <Suspense
            fallback={<Loading className='h-1/2' loadingSize='w-20 h-20' />}
          >
            <LinkInfo id={id} />
          </Suspense>

          {/* 開發者資料 */}
          <Suspense
            fallback={<Loading className='h-1/2' loadingSize='w-20 h-20' />}
          >
            <DeveloperInfo id={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CoinPage;
