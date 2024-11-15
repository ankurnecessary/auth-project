import NextAuth, { User, Profile, Session } from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './lib/db';
import { getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
import type { AdapterUser } from '@auth/core/adapters';

export const jwt = async ({
  token,
  user,
  profile,
}: {
  token: JWT & { role?: UserRole }; // Add the custom role to the token type
  user?: User;
  profile?: Profile;
}): Promise<JWT & { role?: UserRole }> => {
  console.log('=======jwt======');
  console.log({ token, user, profile });
  if (!token.sub) return token;

  const existingUser = await getUserById(token.sub);

  if (!existingUser) return token;

  token.role = existingUser.role;

  return token;
};

export const session = ({
  session,
  token,
}: {
  session: Session & { user?: { id?: string; role?: UserRole } };
  token: JWT & { sub?: string; role?: UserRole };
}): Session & { user?: { id?: string; role?: UserRole } } => {
  console.log('=======session======');
  console.log({ session, token });
  if (!!session.user && !!token.sub) {
    session.user.id = token.sub;
  }

  if (!!session.user && !!token.role) {
    session.user.role = token.role as UserRole;
  }
  return session;
};

export const linkAccount = async ({ user }: { user: User | AdapterUser }) => {
  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  });
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error', // Setting route for authentication error
  },
  events: {
    linkAccount,
  },
  callbacks: {
    jwt,
    session,
  },
  adapter: PrismaAdapter(db), // Using PrismaAdapter to interact with the database
  session: { strategy: 'jwt' }, // Using JWT for authentication purposes
  ...authConfig,
});
