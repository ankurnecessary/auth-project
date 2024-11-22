import { jest } from '@jest/globals';

// Mock the schema validation
jest.mock('@/schemas', () => ({
  loginSchema: {
    safeParse: jest.fn(),
  },
  registerSchema: {
    safeParse: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })),
}));

jest.mock('next-auth/providers/github', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  })),
}));

jest.mock('next-auth', () => {
  class AuthError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'AuthError';
    }
  }
  return {
    __esModule: true,
    default: jest.fn(() => ({
      auth: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      handlers: { GET: jest.fn(), POST: jest.fn() },
    })),
    AuthError,
  };
});

jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: jest.fn((config: any) => ({
    ...config,
    authorize: (credentials: Partial<Record<string, unknown>>, req?: Request) =>
      config.authorize(credentials, req),
  })),
}));
