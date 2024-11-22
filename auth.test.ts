import { UserRole } from '@prisma/client';
import { getUserById } from '@/data/user';
import { prismaMock } from '@/singleton';
import { jwt, session, linkAccount } from '@/auth';

jest.mock('@auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(() => ({
    getUserById: jest.fn(),
    linkAccount: jest.fn(),
  })),
}));

jest.mock('@/data/user', () => ({
  getUserById: jest.fn(),
}));

jest.useFakeTimers();

describe('NextAuth Callbacks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('linkAccount callback', () => {
    const mockUser = { id: '123', emailVerified: null };

    it('should call db.user.update with correct parameters', async () => {
      await linkAccount({ user: mockUser });

      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { emailVerified: expect.any(Date) },
      });
    });

    it('should update emailVerified field to current date', async () => {
      const mockDate = new Date();
      jest.setSystemTime(mockDate); // Mock system date

      await linkAccount({ user: mockUser });

      // Compare the date string (without milliseconds)
      expect(prismaMock.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { emailVerified: expect.any(Date) },
      });

      // Additional check to ensure the date is close to `mockDate` without milliseconds
      const { emailVerified } = prismaMock.user.update.mock.calls[0][0].data;
      expect((emailVerified as Date)?.toISOString().slice(0, -5)).toBe(
        mockDate.toISOString().slice(0, -5),
      );
    });

    afterAll(() => {
      jest.useRealTimers(); // Restore real timers after tests
    });
  });

  describe('jwt callback', () => {
    const UserRole = {
      ADMIN: 'ADMIN',
      USER: 'USER',
    };

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
    // Helper functions to set up session data and token
    const getSessionData = (overrides = {}) => ({
      user: {
        name: 'test',
        email: 'test@test.com',
        image: null,
        role: UserRole.ADMIN,
        ...overrides,
      },
      expires: new Date().toISOString(),
    });

    const getToken = (overrides = {}) => ({
      sub: 'user-id',
      role: UserRole.ADMIN,
      ...overrides,
    });

    it('should add user ID and role to session if available in token', async () => {
      const sessionData = getSessionData();
      const token = getToken();

      const result = session({ session: sessionData, token });

      expect(result.user.id).toBe('user-id');
      expect(result.user.role).toBe(UserRole.ADMIN);
    });

    it('should return session without modifications if user or token is missing', async () => {
      const sessionData = getSessionData({ role: UserRole.USER });
      const token = getToken({ sub: undefined, role: undefined });

      const result = session({ session: sessionData, token });

      expect(result).toEqual(sessionData);
    });
  });
});
