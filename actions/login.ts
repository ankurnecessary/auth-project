'use server';

import { loginSchema } from '@/schemas';
import * as z from 'zod';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';
// TODO: Remove the error ("[auth][error] CredentialsSignin: Read more at https://errors.authjs.dev#credentialssignin") while running build and using invalid credentials on login form.

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFieldset = loginSchema.safeParse(values);

  if (!validatedFieldset.success) {
    return {
      error: 'Invalid fields!',
    };
  }

  const { email, password } = validatedFieldset.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email doesn't exist!" };
  }

  if (!existingUser?.emailVerified) {
    await generateVerificationToken(existingUser?.email || '');
    return { success: 'Confirmation email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };

        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
};
