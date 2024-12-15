import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';

export const fetchCoinData = async (
  id: string
): Promise<CoinInfoApiResponse> => {
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
    } as CoinInfoApiResponse;
  }
};
export const fetchCoinMarketData = async (
  id: string
): Promise<CoinsMarketsApiResponse> => {
  try {
    const data = await fetch(
      `${process.env.COINGECKO_API_URL}/coins/markets?ids=${id}&vs_currency=usd`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
        },
        next: { revalidate: 60 },
      }
    );
    if (!data.ok) {
      throw new Error(`Error fetching data: ${data.statusText}`);
    }
    return (await data.json())[0];
  } catch (error) {
    console.error('Failed to fetch coin data:', error);
    return {} as CoinsMarketsApiResponse;
  }
};
