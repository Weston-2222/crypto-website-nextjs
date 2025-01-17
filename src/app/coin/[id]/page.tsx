import 'server-only';
import CoinTitle from './components/coinTitle';
import MarketInfo from './components/marketInfo';
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
          <CoinTitle id={id} />
        </div>
      </div>
      <div className='flex flex-col xl:flex-row lg:space-x-4 space-y-4 xl:space-y-0 gap-4'>
        {/* 在中小螢幕時 CoinPriceTabs 在上面，正常電腦螢幕時 CoinPriceTabs 在右邊 */}
        <div className='xl:order-2 w-full xl:w-2/3'>
          <PriceChart id={id} />

          {/* 市場資料 */}
          <CategoryInfo id={id} />
        </div>

        {/* 在中小螢幕時 CoinBasicInfoCard 在下面，正常電腦螢幕時 CoinBasicInfoCard 在左邊 */}
        <div className='xl:order-1 w-full xl:w-1/3'>
          {/* 市場資料 */}
          <MarketInfo id={id} />

          {/* 鏈接資料 */}
          <LinkInfo id={id} />

          {/* 開發者資料 */}
          <DeveloperInfo id={id} />
        </div>
      </div>
    </>
  );
};

export default CoinPage;
