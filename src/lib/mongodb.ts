import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('請設定 MONGODB_URI 環境變數');
}
export const connectToDB = async (): Promise<void> => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'crypto_website_ssr', // 指定資料庫名稱
    });
    console.log('成功連接 MongoDB');
  } catch (error) {
    console.error('連接 MongoDB 錯誤:', error);
  }
};
