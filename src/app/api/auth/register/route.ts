import bcrypt from 'bcrypt';
import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // 驗證輸入
  if (!email || !password) {
    return Response.json(
      { message: 'Email 和 Password 是必需的' },
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    await connectToDB();

    // 檢查用戶是否已存在
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: '該 Email 已被註冊' },
        {
          status: 409,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 加密密碼
    const hashedPassword = await bcrypt.hash(password, 10);

    // 創建新用戶
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return Response.json(
      { message: '註冊成功' },
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch {
    return Response.json({ message: '伺服器錯誤' });
  }
}
