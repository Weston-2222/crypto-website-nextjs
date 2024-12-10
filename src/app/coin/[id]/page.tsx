import CoinBasicInfoCard from '@/components/coinBasicInfoCard';
import CoinTitle from '@/components/coinTitle';
import Loading from '@/components/loading';

import TradingViewWidget from '@/dynamic/dynamicTradingViewWidget';
import { CoinDataApiResponse } from '@/types/api/coingecko/coinData';

const getCoinData = async (id: string): Promise<CoinDataApiResponse> => {
  try {
    const data = await fetch(`${process.env.COINGECKO_API_URL}/coins/${id}`, {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
      },
      next: { revalidate: 60 },
    });

    if (!data.ok) {
      throw new Error(`Error fetching data: ${data.statusText}`);
    }

    return await data.json();
  } catch (error) {
    console.error('Failed to fetch coin data:', error);
    // 這裡可以返回一個預設的錯誤物件或其他處理邏輯
    return {
      id: '',
      symbol: '',
      // 其他必要的預設值
    } as CoinDataApiResponse;
  }
};

const CoinPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const coinData = await getCoinData(id);

  return (
    <>
      <div className='w-full'>
        <CoinTitle id={id} />
      </div>

      <div className='flex flex-wrap-reverse gap-2 justify-around'>
        <div className='max-w-[50vw] min-w-[300px]'>
          <CoinBasicInfoCard coinBasicInfoData={coinData} />
        </div>
        <div className='h-[500px] w-[50vw] min-w-[300px]'>
          <div className='h-full w-full'>
            <TradingViewWidget symbol={coinData.symbol} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinPage;
