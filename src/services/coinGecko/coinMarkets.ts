import redis from '@/lib/redis';
import { CoinsMarketsApiResponse } from '@/types/api/coingecko/coinsMarkets';

const fetchCoinMarketData = async (): Promise<CoinsMarketsApiResponse[]> => {
  // 從 CoinGecko 獲取市場資料
  const url = new URL(`${process.env.COINGECKO_API_URL}/coins/markets`);
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
  const data: CoinsMarketsApiResponse[] = await response.json();
  return data;
};

/**
 * 獲取市場資料，兩個參數只能選一個
 * @param params 包含 ids 和 category 的物件
 * @param params.ids 幣種 ID 陣列。若提供，將返回對應的幣種資料；若不提供，將獲取前 100 個幣種。
 * @param params.category 類別。若提供，將返回對應的類別資料。
 * @returns Promise<CoinsMarketsApiResponse[]> 返回市場資料的 Promise。
 * @throws 如果同時提供了 ids 和 category，將拋出錯誤。
 */
export const getCoinMarketsData = async (
  params: {
    category?: string | null;
    ids?: string[] | null;
  } = {}
): Promise<CoinsMarketsApiResponse[]> => {
  const { category, ids } = params;
  if (ids && category) {
    throw new Error('只能提供 ids 或 category 其中之一');
  }

  // 檢查 Redis 緩存
  try {
    const cachedData = await redis.get(`coin_markets`);
    // 如果 Redis 緩存有數據，返回緩存
    if (cachedData !== null) {
      return ids
        ? JSON.parse(cachedData).filter((item: CoinsMarketsApiResponse) =>
            ids.includes(item.id)
          )
        : JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('獲取redis市場資料失敗', error);
  }
  // 如果 Redis 緩存沒有數據，從 CoinGecko API 獲取
  try {
    const data = await fetchCoinMarketData();
    // 將數據存入 Redis
    try {
      await redis.set(
        'coin_markets',
        JSON.stringify(data),
        'EX',
        process.env.REDIS_TTL || 3600
      );
    } catch (error) {
      console.error('緩存市場資料失敗', error);
    }
    // 返回數據
    return ids
      ? data.filter((item: CoinsMarketsApiResponse) => ids.includes(item.id))
      : data;
  } catch (error) {
    console.error('獲取CoinGecko市場資料失敗', error);
  }
  return [];
};
