import { generateVerificationToken } from '@/data/tokens';
import { getVerificationTokenByEmail } from './verification-token';
import db from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

jest.mock('./verification-token');

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('generateVerificationToken', () => {
  const mockEmail = 'test@example.com';
  const mockToken = 'mock-uuid';
  const mockExpires = new Date(new Date().getTime() + 3600 * 1000);
  const mockExistingToken = { id: 'existing-token-id', email: mockEmail };

  beforeEach(() => {
    jest.clearAllMocks();
    (uuidv4 as jest.Mock).mockReturnValue(mockToken);
  });

  it('should create a new verification token if none exists', async () => {
    (getVerificationTokenByEmail as jest.Mock).mockResolvedValueOnce(null);
    (db.verificationToken.create as jest.Mock).mockResolvedValueOnce({
      email: mockEmail,
      token: mockToken,
      expires: mockExpires,
    });

    const result = await generateVerificationToken(mockEmail);

    expect(getVerificationTokenByEmail).toHaveBeenCalledWith(mockEmail);
    expect(db.verificationToken.delete).not.toHaveBeenCalled();
    expect(db.verificationToken.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: mockEmail,
          token: mockToken,
          expires: expect.any(Date),
        }),
      }),
    );
    expect(result).toEqual({
      email: mockEmail,
      token: mockToken,
      expires: mockExpires,
    });
  });

  it('should delete an existing token and create a new one if a token exists', async () => {
    (getVerificationTokenByEmail as jest.Mock).mockResolvedValueOnce(
      mockExistingToken,
    );
    (db.verificationToken.delete as jest.Mock).mockResolvedValueOnce({});
    (db.verificationToken.create as jest.Mock).mockResolvedValueOnce({
      email: mockEmail,
      token: mockToken,
      expires: mockExpires,
    });

    const result = await generateVerificationToken(mockEmail);

    expect(getVerificationTokenByEmail).toHaveBeenCalledWith(mockEmail);
    expect(db.verificationToken.delete).toHaveBeenCalledWith({
      where: { id: mockExistingToken.id },
    });
    expect(db.verificationToken.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: mockEmail,
          token: mockToken,
          expires: expect.any(Date),
        }),
      }),
    );
    expect(result).toEqual({
      email: mockEmail,
      token: mockToken,
      expires: mockExpires,
    });
  });

  it('should propagate errors if token creation fails', async () => {
    (getVerificationTokenByEmail as jest.Mock).mockResolvedValueOnce(null);
    (db.verificationToken.create as jest.Mock).mockRejectedValueOnce(
      new Error('Creation error'),
    );

    await expect(generateVerificationToken(mockEmail)).rejects.toThrow(
      'Creation error',
    );

    expect(getVerificationTokenByEmail).toHaveBeenCalledWith(mockEmail);
    expect(db.verificationToken.delete).not.toHaveBeenCalled();
    expect(db.verificationToken.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: mockEmail,
          token: mockToken,
          expires: expect.any(Date),
        }),
      }),
    );
  });
});
