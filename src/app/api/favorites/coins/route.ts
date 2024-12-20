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
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // 連接資料庫
  await connectToDB();
  // 開啟transaction

  try {
    // 取得user
    const user = await User.findOne({ _id: token.id });
    // 如果user不存在，回傳404
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    // 取得user的收藏列表
    const favoriteCoins = await user.getCoins();

    const res: FavoriteResponse = {
      message: 'Success',
      coins: favoriteCoins,
    };
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json(
      { message: 'Transaction failed', error: error.message },
      { status: 500 }
    );
  }
};
export const POST = async (req: NextRequest) => {
  // 取得token
  const token = await getToken({ req });
  // 如果token不存在，回傳401
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  // 取得request body
  const result: FavoriteRequest = await req.json();
  if (!result.coins) {
    return NextResponse.json({ message: 'No coins' }, { status: 400 });
  }
  // 連接資料庫
  await connectToDB();
  // 開啟transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 取得user
    const user = await User.findOne({ _id: token.id }).session(session);
    // 如果user不存在，回傳404
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
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
      return NextResponse.json(
        { message: 'Failed to add coin' },
        { status: 500 }
      );
    }

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: 'Transaction failed', error: error.message },
      { status: 500 }
    );
  }
};
export const DELETE = async (req: NextRequest) => {
  // 取得token
  const token = await getToken({ req });
  // 如果token不存在，回傳401
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  // 取得request body
  const result: FavoriteRequest = await req.json();
  if (!result.coins) {
    return NextResponse.json({ message: 'No coins' }, { status: 400 });
  }
  // 連接資料庫
  await connectToDB();
  // 開啟transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 取得user
    const user = await User.findOne({ _id: token.id }).session(session);
    // 如果user不存在，回傳404
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    const deleteCoinResult = await user.deleteCoins(result.coins);
    // 如果加入失敗，回傳500
    if (!deleteCoinResult) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { message: 'Failed to delete coin' },
        { status: 500 }
      );
    }

    await session.commitTransaction();
    session.endSession();
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json(
      { message: 'Transaction failed', error: error.message },
      { status: 500 }
    );
  }
};
