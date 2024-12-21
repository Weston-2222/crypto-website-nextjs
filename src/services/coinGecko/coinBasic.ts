import redis from '@/lib/redis';
import { CoinInfoApiResponse } from '@/types/api/coingecko/coinInfo';
const fetchCoinBasicData = async (id: string) => {
  const url = new URL(`${process.env.COINGECKO_API_URL}/coins/${id}`);
  url.searchParams.append('vs_currency', 'usd');
  const response = await fetch(url.toString(), {
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': process.env.COINGECKO_API_KEY || '',
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data: CoinInfoApiResponse = await response.json();
  return data;
};
/**
 * 獲取指定幣種的基本資料
 * @param id 幣種的唯一標識符
 * @returns 返回包含幣種基本資料的 Promise 對象
 */
export const getCoinBasicData = async (
  id: string
): Promise<CoinInfoApiResponse> => {
  try {
    // 檢查 Redis 緩存
    const cachedData = await redis.get(`${id}_basic`);
    if (cachedData) {
      // 如果有緩存數據，返回緩存
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('獲取redis幣種基本資料失敗', error);
  }
  // 從CoinGecko獲取硬幣基本資料
  try {
    const data: CoinInfoApiResponse = await fetchCoinBasicData(id);

    // 將數據存入 Redis，設置過期時間
    try {
      await redis.set(
        `${id}_basic`,
        JSON.stringify(data),
        'EX',
        process.env.REDIS_TTL || 3600
      );
    } catch (error) {
      console.error('緩存幣種基本資料失敗', error);
    }
    return data;
  } catch (error) {
    console.error('獲取CoinGecko幣種基本資料失敗', error);
    return {} as CoinInfoApiResponse;
  }
};
