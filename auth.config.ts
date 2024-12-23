import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { loginSchema } from '@/schemas';
import { getUserByEmail } from './data/user';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);

          // This condition will work when a user's password is not present. That means while registration, he didn't creat the password. Instead, he used social login methods to login.Like google and github. In that case he has to use the same social login to login.
          if (!user || !user.password) return null;

          // If user and its password exist then we are comparing the stored encrypted password with the encrypted entered password.
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // If everything goes well user will be returned.
          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
