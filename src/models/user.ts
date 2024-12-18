import mongoose, { Schema, Document, Model } from 'mongoose';

// 用戶的介面 (TypeScript 型別)
export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

// 用戶 Schema
const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
