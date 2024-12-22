import { coin } from '@/models/user';

export type GetUserResponse = {
  _id: string;
  email: string;
  createdAt: Date;
  favorites: { coins: coin[] };
};
