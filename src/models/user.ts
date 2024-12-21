import mongoose, { Schema, Document, Model } from 'mongoose';
type User = {
  _id: string;
  email: string;
  createdAt: Date;
  favorites: { coins: coin[] };
};
// 用戶的介面 (TypeScript 型別)
export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  createdAt: Date;
  favorites: { coins: coin[] };
  getUser: () => Promise<User>;
  addCoins: (coin: coin[]) => Promise<boolean>;
  getCoins: () => Promise<coin[]>;
  deleteCoins: (coin: coin[]) => Promise<boolean>;
}
export type coin = {
  coin_id: string;
};

// 用戶 Schema
const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  favorites: {
    coins: {
      type: [
        {
          coin_id: String,
        },
      ],
    },
  },
});
UserSchema.methods.getUser = async function (): Promise<User> {
  return {
    _id: this._id,
    email: this.email,
    createdAt: this.createdAt,
    favorites: {
      coins: this.favorites.coins,
    },
  };
};
UserSchema.methods.addCoins = async function (coin: coin[]): Promise<boolean> {
  try {
    this.favorites.coins.push(...coin);
    await this.save();
    return true; // 更新成功
  } catch (error) {
    console.error('新增 coin 失敗:', error);
    return false; // 更新失敗
  }
};

UserSchema.methods.getCoins = async function (): Promise<coin[]> {
  return this.favorites.coins;
};
UserSchema.methods.deleteCoins = async function (
  coin: coin[]
): Promise<boolean> {
  try {
    this.favorites.coins = this.favorites.coins.filter((c: coin) => {
      //console.log(coin);
      return !coin.some((delCoin) => delCoin.coin_id === c.coin_id);
    });
    await this.save();
    return true; // 更新成功
  } catch (error) {
    console.error('刪除 coin 失敗:', error);
    return false; // 更新失敗
  }
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
