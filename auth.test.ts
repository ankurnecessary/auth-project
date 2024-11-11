// auth.test.ts
import { UserRole } from '@prisma/client';
import { getUserById } from '@/data/user';
import { jwt, session } from '@/auth';

jest.mock('next-auth/providers/credentials', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      authorize: jest.fn().mockResolvedValue({ id: 'user-id', role: 'USER' }),
    })),
  };
});

jest.mock('next-auth', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      auth: jest.fn(),
      signIn: jest.fn(),
      signOut: jest.fn(),
      handlers: { GET: jest.fn(), POST: jest.fn() },
    })),
  };
});

jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(() => jest.fn()), // Mocked PrismaAdapter
}));

jest.mock('@/data/user', () => ({
  getUserById: jest.fn(),
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

describe('NextAuth Callbacks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('jwt callback', () => {
    it('should add role to the token if user exists', async () => {
      const userId = 'user-id';
      const mockUser = { id: userId, role: UserRole.USER };

      (getUserById as jest.Mock).mockResolvedValueOnce(mockUser);

      const token = await jwt({
        token: { sub: userId },
        user: undefined,
        profile: undefined,
      });

      expect(getUserById).toHaveBeenCalledWith(userId);
      expect(token.role).toBe(UserRole.USER);
    });

    it('should return token as-is if token.sub is missing', async () => {
      const token = { sub: undefined };
      const result = await jwt({
        token,
        user: undefined,
        profile: undefined,
      });

      expect(result).toEqual(token);
    });
  });

  describe('session callback', () => {
    it('should add user ID and role to session if available in token', async () => {
      const sessionData = {
        user: {
          name: 'test',
          email: 'test@test.com',
          image: null,
          role: UserRole.ADMIN,
        },
        expires: new Date().toISOString(),
      };

      const token = { sub: 'user-id', role: UserRole.ADMIN };

      const result = session({ session: sessionData, token });

      expect(result.user.id).toBe('user-id');
      expect(result.user.role).toBe(UserRole.ADMIN);
    });

    it('should return session without modifications if user or token is missing', async () => {
      const sessionData = {
        user: { role: UserRole.USER },
        expires: new Date().toISOString(),
      };
      const token = {};

      const result = session({ session: sessionData, token });

      expect(result).toEqual(sessionData);
    });
  });
});
