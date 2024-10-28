import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './lib/db';
import { getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  callbacks: {
    async jwt({ token, user, profile }) {
      console.log('=======jwt======');
      console.log({ token, user, profile });
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
    session({ session, token }) {
      console.log('=======session======');
      console.log({ session, token });
      if (!!session.user && !!token.sub) {
        session.user.id = token.sub;
      }

      if (!!session.user && !!token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db), // Using PrismaAdapter to interact with the database
  session: { strategy: 'jwt' }, // Using JWT for authentication purposes
  ...authConfig,
});
