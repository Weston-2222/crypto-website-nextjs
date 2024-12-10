export type CoinsMarketsApiResponse = {
  id: string; // 貨幣 ID
  symbol: string; // 貨幣符號
  name: string; // 貨幣名稱
  image: string; // 貨幣圖片 URL
  current_price: number; // 當前價格
  market_cap: number; // 市值
  market_cap_rank: number; // 市值排名
  fully_diluted_valuation: number; // 完全稀釋估值
  total_volume: number; // 總交易量
  high_24h: number; // 24 小時內最高價
  low_24h: number; // 24 小時內最低價
  price_change_24h: number; // 24 小時內價格變化
  price_change_percentage_24h: number; // 24 小時內價格變化百分比
  market_cap_change_24h: number; // 24 小時內市值變化
  market_cap_change_percentage_24h: number; // 24 小時內市值變化百分比
  circulating_supply: number; // 流通供應量
  total_supply: number; // 總供應量
  max_supply: number; // 最大供應量
  ath: number; // 歷史最高價
  ath_change_percentage: number; // 距離歷史最高價的變化百分比
  ath_date: string; // 歷史最高價日期
  atl: number; // 歷史最低價
  atl_change_percentage: number; // 距離歷史最低價的變化百分比
  atl_date: string; // 歷史最低價日期
  roi: null; // 投資回報率（目前為空）
  last_updated: string; // 最後更新時間
};
