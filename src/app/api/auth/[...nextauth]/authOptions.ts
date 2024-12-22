import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { authorize } from './authorize';
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: authorize,
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      // 添加用戶角色到會話對象
      session.user._id = token.sub as string;
      session.user.email = token.email as string;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
