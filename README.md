# **加密貨幣資訊網站**

一個使用 Next.js 開發的加密貨幣資訊網站，結合 Tailwind CSS 進行樣式設計，並使用 Redis 和 MongoDB 提供高效的數據存儲與緩存功能。

---

## **功能介紹**

- **加密貨幣即時數據查詢**：提供即時的加密貨幣市場價格與數據。
- **用戶管理與認證**：支援註冊、登入。
- **收藏與組合管理**：用戶可將喜愛的加密貨幣加入收藏。
- **高效數據緩存**：使用 Redis 快速緩存 API 數據以提升響應速度。

---

## **技術棧**

- **框架**：Next.js
- **樣式**：Tailwind CSS
- **數據庫**：MongoDB
- **緩存**：Redis
- **API 數據**：整合 CoinGecko API
- **部署**：Vercel

---

## **專案結構**

```plaintext
|—app               路由與頁面
|—components/       通用元件
|—dynamic/          動態元件
|—hooks/            自定義 hooks
|—lib/              資料庫與 Redis 的連接配置
|—models/           資料庫設置
|—services/         第三方API函數
|—types/            資料類型
```
