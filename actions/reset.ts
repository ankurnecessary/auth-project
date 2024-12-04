'use server';
import * as z from 'zod';

import { resetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }

  // TODO: Generate token and send email

  return { success: 'Reset email sent!' };
};
