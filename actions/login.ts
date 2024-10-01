'use server';

import { loginSchema } from '@/schemas';
import * as z from 'zod';

export const login = (values: z.infer<typeof loginSchema>) => {
  console.log(values);
};
