// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string;
      _id: string;
      favorites: {
        coins: {
          coin_id: string;
          createdAt: Date;
        }[];
      };
    };
  }
}
