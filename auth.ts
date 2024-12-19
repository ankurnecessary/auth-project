import NextAuth, { User, Profile, Session, Account } from 'next-auth';
import authConfig from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import db from './lib/db';
import { getUserByEmail, getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';
import { JWT } from 'next-auth/jwt';
import type { AdapterUser } from '@auth/core/adapters';
import { CredentialInput } from 'next-auth/providers/credentials';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';

export const jwt = async ({
  token,
  user,
  profile,
}: {
  // Add the custom role and isTwoFactorEnabled fields to the token type
  token: JWT;
  user?: User;
  profile?: Profile;
}): Promise<JWT> => {
  console.log('=======jwt======');
  console.log({ token, user, profile });
  if (!token.sub) return token;

  const existingUser = await getUserById(token.sub);

  if (existingUser) {
    token.role = existingUser.role;
    token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
  }

  return token;
};

export const session = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Session => {
  console.log('=======session======');
  console.log({ session, token });
  if (!!session.user && !!token.sub) {
    session.user.id = token.sub;
  }

  if (session.user) {
    session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
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

export const signInFunc = async ({
  user,
  account,
}: {
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile;
  email?: {
    verificationRequest?: boolean;
  };
  credentials?: Record<string, CredentialInput>;
}): Promise<boolean | string> => {
  // Allow OAuth without email verification
  if (account?.provider !== 'credentials') return true;

  // A user with unverified email cannot login
  const existingUser = await getUserByEmail(user?.email || '');
  if (!existingUser?.emailVerified) return false;

  if (existingUser.isTwoFactorEnabled) {
    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      existingUser.id,
    );

    if (!twoFactorConfirmation) return false;

    // Delete 2 factor confirmation for next sign in
    await db.twoFactorConfirmation.delete({
      where: { id: twoFactorConfirmation.id },
    });
  }

  return true;
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
    signIn: signInFunc,
    jwt,
    session,
  },
  adapter: PrismaAdapter(db), // Using PrismaAdapter to interact with the database
  session: { strategy: 'jwt' }, // Using JWT for authentication purposes
  ...authConfig,
});
