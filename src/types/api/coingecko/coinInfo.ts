// 基本資料類型
export type BasicInformation = {
  id: string; // 資產的唯一識別碼
  symbol: string; // 資產的代號 (例如 BTC, ETH)
  name: string; // 資產的名稱
  web_slug: string; // 網頁用的 slug，通常是名稱的小寫連字形式
  asset_platform_id: string | null; // 資產平台 ID，可能為空值
  block_time_in_minutes: number; // 區塊生成時間，單位為分鐘
  hashing_algorithm: string; // 使用的哈希算法
  country_origin: string; // 資產的原產國
  genesis_date: string; // 創世日期 (ISO 格式的日期字串)
  platforms: { [key: string]: string }; // 平台資訊，key 為平台名稱，value 為相關資訊
  detail_platforms: {
    // 詳細平台資訊
    [key: string]: {
      decimal_place: number | null; // 小數點位數，可能為空值
      contract_address: string; // 智能合約地址
    };
  };
};

// 定義鏈接資訊類型
export type Links = {
  homepage: string[]; // 官方網站 URL 陣列
  whitepaper: string; // 白皮書的 URL
  blockchain_site: string[]; // 區塊鏈網站的 URL 陣列
  official_forum_url: string[]; // 官方論壇 URL 陣列
  chat_url: string[]; // 聊天平台 URL 陣列 (例如 Discord, Telegram)
  announcement_url: string[]; // 官方公告 URL 陣列
  twitter_screen_name: string; // Twitter 帳戶名稱 (不包含 @)
  facebook_username: string; // Facebook 帳戶名稱
  bitcointalk_thread_identifier: null; // BitcoinTalk 帖子識別碼 (通常為 null)
  telegram_channel_identifier: string; // Telegram 頻道識別碼
  subreddit_url: string; // Subreddit 的 URL
  repos_url: {
    github: string[]; // GitHub 儲存庫 URL 陣列
    bitbucket: []; // Bitbucket 儲存庫 URL 陣列 (目前為空陣列)
  };
};

// 定義圖片資訊類型
export type Image = {
  thumb: string;
  small: string;
  large: string;
};

// 社群數據
export type CommunityData = {
  facebook_likes: number; // Facebook 的按讚數
  twitter_followers: number; // Twitter 的追隨者數量
  reddit_average_posts_48h: number; // Reddit 過去 48 小時的平均發帖數
  reddit_average_comments_48h: number; // Reddit 過去 48 小時的平均評論數
  reddit_subscribers: number; // Reddit 的訂閱者數量
  reddit_accounts_active_48h: number; // Reddit 過去 48 小時的活躍用戶數
  telegram_channel_user_count: number; // Telegram 頻道的用戶數量
};

// 開發者數據
export type DeveloperData = {
  forks: number; // 分支數量
  stars: number; // 星標數量
  subscribers: number; // 訂閱者數量
  total_issues: number; // 總問題數量
  closed_issues: number; // 已關閉問題數量
  pull_requests_merged: number; // 合併的拉取請求數量
  pull_request_contributors: number; // 拉取請求的貢獻者數量
  code_additions_deletions_4_weeks: {
    additions: number; // 四週內的代碼新增行數
    deletions: number; // 四週內的代碼刪除行數
  };
  commit_count_4_weeks: number; // 四週內的提交次數
  last_4_weeks_commit_activity_series: []; // 四週內的提交活動序列
};

// 市場資訊
export type MarketData = {
  market_cap_rank: number; // 市值排名
  tickers: Ticker[]; // 交易對
};
export type Ticker = {
  base: string; // 基礎貨幣
  target: string; // 目標貨幣
  market: {
    name: string; // 市場名稱
    identifier: string; // 市場識別碼
    has_trading_incentive: boolean; // 是否有交易激勵
  };
  last: number; // 最新成交價
  volume: number; // 交易量
  converted_last: {
    btc: number; // 轉換為比特幣的最新成交價
    eth: number; // 轉換為以太幣的最新成交價
    usd: number; // 轉換為美元的最新成交價
  };
  converted_volume: {
    btc: number; // 轉換為比特幣的交易量
    eth: number; // 轉換為以太幣的交易量
    usd: number; // 轉換為美元的交易量
  };
  trust_score: string; // 信任分數
  bid_ask_spread_percentage: number; // 買賣價差百分比
  timestamp: string; // 時間戳
  last_traded_at: string; // 最後交易時間
  last_fetch_at: string; // 最後獲取時間
  is_anomaly: boolean; // 是否為異常
  is_stale: boolean; // 是否過時
  trade_url: string; // 交易網址
  token_info_url: string; // 代幣資訊網址
  coin_id: string; // 貨幣 ID
  target_coin_id: string; // 目標貨幣 ID
};

// 定義主要的 CoinDataApiResponse 類型
export type CoinDataApiResponse = BasicInformation &
  MarketData & {
    categories: string[]; //分類
    preview_listing: false;
    public_notice: null; //公告
    additional_notices: []; //其他公告
    description: {
      //描述
      [key: string]: string;
    };
    links: Links; //鏈接
    image: Image; //圖片
    //用戶參與和投票
    sentiment_votes_up_percentage: number;
    sentiment_votes_down_percentage: number;
    watchlist_portfolio_users: number;
    //社群數據
    community_data: CommunityData;
    //開發者數據
    developer_data: DeveloperData;
    last_updated: string; // 最後更新時間
  };
