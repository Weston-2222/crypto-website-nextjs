import redis from '@/lib/redis';
import { CoinCategoriesListApiResponse } from '@/types/api/coingecko/categoriesList';

const fetchCoinCategoryList =
  async (): Promise<CoinCategoriesListApiResponse> => {
    const data = await fetch(
      `${process.env.COINGECKO_API_URL}/coins/categories/list`,
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
        },
        cache: 'no-store',
      }
    );
    return await data.json();
  };

/**
 * 獲取所有類別list
 * @returns
 */
export const getCoinCategoryList =
  async (): Promise<CoinCategoriesListApiResponse> => {
    // 從Redis獲取數據
    try {
      const categoriesList = await redis.get(`categories_list`);
      if (categoriesList) {
        return JSON.parse(categoriesList);
      }
    } catch (error) {
      console.error('獲取redis類別List失敗', error);
    }
    // 從CoinGecko獲取數據
    try {
      const data = await fetchCoinCategoryList();
      // 將數據存入Redis
      try {
        await redis.set(`categories_list`, JSON.stringify(data), 'EX', 86400);
      } catch (error) {
        console.error('存入redis類別List失敗', error);
      }
      return data;
    } catch (error) {
      console.error('獲取CoinGecko類別List失敗', error);
      throw error;
    }
    return [];
  };
