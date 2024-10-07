'use server';

import { registerSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcrypt';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFieldset = registerSchema.safeParse(values);

  if (!validatedFieldset) {
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

  // TODO: Send verification token email

  return {
    success: 'Registration successful!',
  };
};
