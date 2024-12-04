import { register } from '@/actions/register';
import { registerSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import db from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

// Mock external dependencies
jest.mock('@/data/user');
jest.mock('@/lib/tokens');
jest.mock('@/lib/mail');

describe('register', () => {
  const mockValues = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return an error if fields are invalid', async () => {
    // Mock the schema to return an invalid result
    jest.spyOn(registerSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new z.ZodError([]),
    });

    const result = await register(mockValues);

    expect(result).toEqual({ error: 'Invalid fields!' });
  });

  it('should return an error if the user already exists', async () => {
    // Mock valid schema parsing
    jest.spyOn(registerSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    // Mock the result of getUserByEmail to indicate that the user already exists
    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      id: 'user-id',
      email: mockValues.email,
    });

    const result = await register(mockValues);

    expect(result).toEqual({ error: 'Email already exists!' });
    expect(getUserByEmail).toHaveBeenCalledWith(mockValues.email);
    expect(db.user.create).not.toHaveBeenCalled();
  });

  it('should hash the password and create a new user', async () => {
    // Mock valid schema parsing
    jest.spyOn(registerSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    // Mock that no user exists
    (getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    // Mock password hashing
    (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedPassword');

    // Mock verification token generation
    (generateVerificationToken as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      token: 'verificationToken',
    });

    const result = await register(mockValues);

    expect(result).toEqual({ success: 'Confirmation email sent!' });
    expect(getUserByEmail).toHaveBeenCalledWith(mockValues.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(mockValues.password, 10);
    expect(db.user.create).toHaveBeenCalledWith({
      data: {
        name: mockValues.name,
        email: mockValues.email,
        password: 'hashedPassword',
      },
    });
    expect(generateVerificationToken).toHaveBeenCalledWith(mockValues.email);
    expect(sendVerificationEmail).toHaveBeenCalledWith(
      mockValues.email,
      'verificationToken',
    );
  });
});
