'use server';

import { registerSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/data/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFieldset = registerSchema.safeParse(values);
  if (!validatedFieldset.success) {
    return {
      error: 'Invalid fields!',
    };
  }

  const { email, password, name } = validatedFieldset.data!;

  const hashedPassword = await bcrypt.hash(password, 10);

  const isExistingUser = await getUserByEmail(email);

  if (isExistingUser) {
    return { error: 'Email already exists!' };
  }

  await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: 'Confirmation email sent!',
  };
};
