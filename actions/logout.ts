'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // We can perform some server stuff before actually logging out a user
  await signOut();
};
