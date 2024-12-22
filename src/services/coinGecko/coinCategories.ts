// import redis from '@/lib/redis';
import { CoinCategoriesApiResponse } from '@/types/api/coingecko/coinCategories';

const fetchCoinCategoriesData = async (): Promise<
  CoinCategoriesApiResponse[]
> => {
  const response = await fetch(
    `${process.env.COINGECKO_API_URL}/coins/categories`,
    {
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
      },
      next: {
        revalidate: 3600,
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};
/**
 * 獲取所有類別的數據
 * @returns 返回包含所有類別數據的 Promise 對象
 */
export const getCoinCategoriesData = async (): Promise<
  CoinCategoriesApiResponse[]
> => {
  // 從Redis獲取數據
  // try {
  //   const cachedData = await redis.get(`coin_categories`);
  //   if (cachedData) {
  //     return JSON.parse(cachedData);
  //   }
  // } catch (error) {
  //   console.error('獲取redis幣種類別資料失敗', error);
  // }
  try {
    // 從CoinGecko獲取數據
    const data = await fetchCoinCategoriesData();
    // 將數據存入Redis
    // try {
    //   await redis.set(`coin_categories`, JSON.stringify(data), 'EX', 86400);
    // } catch (error) {
    //   console.error('存入redis幣種類別資料失敗', error);
    // }
    return data;
  } catch (error) {
    console.error('獲取CoinGecko幣種類別資料失敗', error);
  }
  return [];
};
