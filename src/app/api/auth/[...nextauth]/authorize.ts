import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';
import bcrypt from 'bcrypt';
export const authorize = async (
  credentials: Record<'email' | 'password', string> | undefined
) => {
  // 連接資料庫
  await connectToDB();

  // 查詢用戶
  const user = await User.findOne({ email: credentials?.email });
  if (!user) throw new Error('用戶不存在');

  // 驗證密碼
  const isValid = await bcrypt.compare(
    credentials?.password || '',
    user.password
  );
  if (!isValid) throw new Error('密碼錯誤');

  return { id: user._id as string, email: user.email };
};
