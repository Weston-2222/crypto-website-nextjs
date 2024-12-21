//新增
export type FavoriteRequest = {
  coins?: {
    coin_id: string;
  }[];
  news?: {
    news_id: string;
  }[];
};

export type FavoriteResponse = {
  message: string;
  coins?: {
    coin_id: string;
  }[];
  news?: {
    news_id: string;
  }[];
};

export type FavoriteCoinResponse = {
  message: string;
};

//取得
export type GetFavoriteCoinResponse = {
  message: string;
  coins: {
    coin_id: string;
  }[];
};
