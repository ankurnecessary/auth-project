import { jest } from '@jest/globals';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: () => ({
    get: jest.fn((key) => {
      if (key === 'error') return 'OAuthAccountNotLinked';
      return null;
    }),
  }),
}));
