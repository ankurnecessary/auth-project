import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './lib/db';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  callbacks: {
    jwt({ token, user, profile }) {
      console.log({ token, user, profile });
      return token;
    },
    session({ session, token }) {
      if (!!session.user && !!token.sub) {
        session.user.id = token.sub;
      }
      console.log({ session, token });
      return session;
    },
  },
  adapter: PrismaAdapter(db), // Using PrismaAdapter to interact with the database
  session: { strategy: 'jwt' }, // Using JWT for authentication purposes
  ...authConfig,
});
