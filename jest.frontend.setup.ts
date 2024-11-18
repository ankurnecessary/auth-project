import { jest } from '@jest/globals';

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));
