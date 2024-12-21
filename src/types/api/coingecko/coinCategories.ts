export type CoinCategoriesApiResponse = {
  id: string; // 類別的唯一識別碼
  name: string; // 類別的名稱
  market_cap: number; // 市值
  market_cap_change_24h: number; // 24小時內市值變化百分比
  content: string; // 類別的描述內容
  top_3_coins_id: string[]; // 前三大加密貨幣的ID
  top_3_coins: string[]; // 前三大加密貨幣的圖片URL
  volume_24h: number; // 24小時內的交易量
  updated_at: string; // 最後更新的時間戳
};
