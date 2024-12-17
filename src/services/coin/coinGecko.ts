import { CoinCategoriesListApiResponse } from '@/types/api/coingecko/categoriesList';
import { CoinCategoriesApiResponse } from '@/types/api/coingecko/coinCategories';
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
// 獲取市場資料
export const fetchCoinMarketData = async (params: {
  category?: string;
  id?: string;
}): Promise<CoinsMarketsApiResponse[]> => {
  const url = new URL(`${process.env.COINGECKO_API_URL}/coins/markets`);

  url.searchParams.append('vs_currency', 'usd');
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const data = await fetch(url.toString(), {
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
    },
    next: { revalidate: 60 },
  });
  const newData = await data.json();
  return newData.map((item: CoinsMarketsApiResponse) => ({
    ...item,
    name_symbol: `${item.name}_${item.symbol}`,
  }));
};
/**
 * 獲取所有類別的數據
 * @returns
 */
export const fetchCoinCategoriesData = async (): Promise<
  CoinCategoriesApiResponse[]
> => {
  const data = await fetch(
    `${process.env.COINGECKO_API_URL}/coins/categories`,
    {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
      },
    }
  );
  return await data.json();
};

// 獲取所有類別list
export const fetchCoinCategoryList =
  async (): Promise<CoinCategoriesListApiResponse> => {
    const data = await fetch(
      `${process.env.COINGECKO_API_URL}/coins/categories/list`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
        },
      }
    );
    return await data.json();
  };
