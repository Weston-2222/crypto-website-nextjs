import { connectToDB } from '@/lib/mongodb';
import User from '@/models/user';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import {
  FavoriteRequest,
  FavoriteResponse,
} from '@/types/api/user/favoriteCoin';
export const GET = async (req: NextRequest) => {
  // 取得token
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ message: '未授權' }, { status: 401 });
  }

  // 連接資料庫
  await connectToDB();
  // 開啟transaction

  try {
    // 取得user
    const user = await User.findById(token.sub);
    // 如果user不存在，回傳404
    if (!user) {
      return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }
    // 取得user的收藏列表
    const favoriteCoins = await user.getCoins();

    const res: FavoriteResponse = {
      message: 'Success',
      coins: favoriteCoins,
    };
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: '伺服器錯誤', error: (error as Error).message },
      { status: 500 }
    );
  }
};
export const POST = async (req: NextRequest) => {
  // 取得token
  const token = await getToken({ req });

  // 驗證token是否存在
  if (!token || !token.sub) {
    return NextResponse.json({ message: '未授權' }, { status: 401 });
  }

  // 取得request body
  let result: FavoriteRequest;
  try {
    result = await req.json();
  } catch {
    return NextResponse.json({ message: '格式錯誤' }, { status: 422 });
  }

  // 檢查coins格式
  if (
    !result ||
    !Array.isArray(result.coins) ||
    result.coins.some((coin) => !coin.coin_id)
  ) {
    return NextResponse.json({ message: '格式錯誤' }, { status: 422 });
  }

  // 連接資料庫
  await connectToDB();

  // 開啟transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 取得user
    const user = await User.findOne({ _id: token.sub }).session(session);
    if (!user) {
      await session.abortTransaction();
      return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }

    // 取得收藏的幣種
    const favoriteCoins = await user.getCoins();
    const favoriteCoinIds = favoriteCoins.map((coin) => coin.coin_id);

    // 過濾新增的幣種
    const addCoins = result.coins
      .filter((coin) => !favoriteCoinIds.includes(coin.coin_id))
      .map((coin) => ({ coin_id: coin.coin_id, createdAt: new Date() }));

    // 新增收藏幣種
    if (addCoins.length > 0) {
      const addCoinResult = await user.addCoins(addCoins);
      if (!addCoinResult) {
        await session.abortTransaction();
        return NextResponse.json({ message: '收藏失敗' }, { status: 500 });
      }
    }

    // 提交transaction
    await session.commitTransaction();
    return NextResponse.json({ message: '收藏成功' }, { status: 201 });
  } catch (error) {
    // 捕捉錯誤
    await session.abortTransaction();
    return NextResponse.json(
      {
        message: '伺服器錯誤',
        error:
          process.env.NODE_ENV === 'development'
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    // 確保session結束
    session.endSession();
  }
};

export const DELETE = async (req: NextRequest) => {
  // 取得 token
  const token = await getToken({ req });

  if (!token || !token.sub) {
    return NextResponse.json({ message: '未授權' }, { status: 401 });
  }

  let result: FavoriteRequest;
  try {
    result = await req.json();
  } catch {
    return NextResponse.json({ message: '請求格式錯誤' }, { status: 400 });
  }

  if (
    !result ||
    !Array.isArray(result.coins) ||
    result.coins.some((coin) => !coin.coin_id)
  ) {
    return NextResponse.json(
      { message: '沒有要刪除的幣種或格式錯誤' },
      { status: 400 }
    );
  }

  await connectToDB();

  const session = await mongoose.startSession();
  let transactionCommitted = false; // 標記交易是否已提交
  session.startTransaction();

  try {
    const user = await User.findOne({ _id: token.sub }).session(session);
    if (!user) {
      throw new Error('用戶不存在');
    }

    const deleteCoinResult = await user.deleteCoins(result.coins);
    if (!deleteCoinResult) {
      throw new Error('刪除失敗');
    }

    await session.commitTransaction();
    transactionCommitted = true;

    return NextResponse.json({ message: '刪除成功' }, { status: 200 });
  } catch (error) {
    if (!transactionCommitted) {
      await session.abortTransaction();
    }
    return NextResponse.json(
      {
        message: '伺服器錯誤，刪除失敗',
        error:
          process.env.NODE_ENV === 'development'
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
};
