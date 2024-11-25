import {
  getVerificationTokenByToken,
  getVerificationTokenByEmail,
} from '@/data/verification-token';
import db from '@/lib/db';

jest.mock('@/lib/db', () => ({
  verificationToken: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
  },
}));

describe('Verification Token Functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getVerificationTokenByToken', () => {
    it('should return the verification token if found', async () => {
      const mockToken = 'mock-token';
      const mockVerificationToken = {
        token: mockToken,
        email: 'test@example.com',
      };

      (db.verificationToken.findUnique as jest.Mock).mockResolvedValueOnce(
        mockVerificationToken,
      );

      const result = await getVerificationTokenByToken(mockToken);

      expect(db.verificationToken.findUnique).toHaveBeenCalledWith({
        where: { token: mockToken },
      });
      expect(result).toEqual(mockVerificationToken);
    });

    it('should return null if no token is found', async () => {
      const mockToken = 'non-existent-token';

      (db.verificationToken.findUnique as jest.Mock).mockResolvedValueOnce(
        null,
      );

      const result = await getVerificationTokenByToken(mockToken);

      expect(db.verificationToken.findUnique).toHaveBeenCalledWith({
        where: { token: mockToken },
      });
      expect(result).toBeNull();
    });

    it('should return null if an error occurs', async () => {
      const mockToken = 'mock-token';

      (db.verificationToken.findUnique as jest.Mock).mockRejectedValueOnce(
        new Error('Database error'),
      );

      const result = await getVerificationTokenByToken(mockToken);

      expect(db.verificationToken.findUnique).toHaveBeenCalledWith({
        where: { token: mockToken },
      });
      expect(result).toBeNull();
    });
  });

  describe('getVerificationTokenByEmail', () => {
    it('should return the verification token if found by email', async () => {
      const mockEmail = 'test@example.com';
      const mockVerificationToken = { token: 'mock-token', email: mockEmail };

      (db.verificationToken.findFirst as jest.Mock).mockResolvedValueOnce(
        mockVerificationToken,
      );

      const result = await getVerificationTokenByEmail(mockEmail);

      expect(db.verificationToken.findFirst).toHaveBeenCalledWith({
        where: { email: mockEmail },
      });
      expect(result).toEqual(mockVerificationToken);
    });

    it('should return null if no token is found by email', async () => {
      const mockEmail = 'non-existent@example.com';

      (db.verificationToken.findFirst as jest.Mock).mockResolvedValueOnce(null);

      const result = await getVerificationTokenByEmail(mockEmail);

      expect(db.verificationToken.findFirst).toHaveBeenCalledWith({
        where: { email: mockEmail },
      });
      expect(result).toBeNull();
    });

    it('should return null if an error occurs', async () => {
      const mockEmail = 'test@example.com';

      (db.verificationToken.findFirst as jest.Mock).mockRejectedValueOnce(
        new Error('Database error'),
      );

      const result = await getVerificationTokenByEmail(mockEmail);

      expect(db.verificationToken.findFirst).toHaveBeenCalledWith({
        where: { email: mockEmail },
      });
      expect(result).toBeNull();
    });
  });
});
