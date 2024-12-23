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
  // 如果token不存在，回傳401
  if (!token) {
    return NextResponse.json({ message: '未授權' }, { status: 401 });
  }
  // 取得request body
  const result: FavoriteRequest = await req.json();
  if (!result.coins) {
    return NextResponse.json({ message: '沒有收藏的幣種' }, { status: 422 });
  }
  // 連接資料庫
  await connectToDB();
  // 開啟transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 取得user
    const user = await User.findOne({ _id: token.sub }).session(session);
    // 如果user不存在，回傳404
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }
    // 取得user的收藏列表
    const favoriteCoins = await user.getCoins();
    // 過濾掉已經在收藏列表中的幣種
    const favoriteCoinIds = favoriteCoins.map((coin) => coin.coin_id);

    const addCoins = result.coins
      .filter((coin) => !favoriteCoinIds.includes(coin.coin_id))
      .map((coin) => ({ coin_id: coin.coin_id, createdAt: new Date() }));

    // 把新的幣種加入收藏列表
    const addCoinResult = await user.addCoins(addCoins);
    // 如果加入失敗，回傳500
    if (!addCoinResult) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: '收藏失敗' }, { status: 500 });
    }

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json({ message: '收藏成功' }, { status: 201 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: '伺服器錯誤', error: (error as Error).message },
      { status: 500 }
    );
  }
};
export const DELETE = async (req: NextRequest) => {
  // 取得token
  const token = await getToken({ req });
  // 如果token不存在，回傳401
  if (!token) {
    return NextResponse.json({ message: '未授權' }, { status: 401 });
  }
  // 取得request body
  const result: FavoriteRequest = await req.json();
  if (!result.coins) {
    return NextResponse.json({ message: '沒有要刪除的幣種' }, { status: 400 });
  }
  // 連接資料庫
  await connectToDB();
  // 開啟transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 取得user
    const user = await User.findOne({ _id: token.sub }).session(session);
    // 如果user不存在，回傳404
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: '用戶不存在' }, { status: 404 });
    }
    const deleteCoinResult = await user.deleteCoins(result.coins);
    // 如果加入失敗，回傳500
    if (!deleteCoinResult) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: '伺服器錯誤，刪除失敗' },
        { status: 500 }
      );
    }

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json({ message: '刪除成功' }, { status: 204 });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: '伺服器錯誤，刪除失敗', error: (error as Error).message },
      { status: 500 }
    );
  }
};
