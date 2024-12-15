import * as z from 'zod';

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: 'Minimum 6 characters required.',
  }),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(1, {
    message: 'Password is required.',
  }),
  code: z.optional(z.string()),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required.',
  }),
  name: z.string().min(1, {
    message: 'Name is required.',
  }),
});
