'use server';

import { registerSchema } from '@/schemas';
import * as z from 'zod';

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFieldset = registerSchema.safeParse(values);

  if (!validatedFieldset) {
    return {
      error: 'Invalid fields!',
    };
  }

  return {
    success: 'Registration successful!',
  };
};
