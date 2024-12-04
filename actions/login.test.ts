import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { login } from '@/actions/login';
import { loginSchema } from '@/schemas';
import * as z from 'zod';
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

// Mock the signIn function
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

jest.mock('@/data/user');
jest.mock('@/data/tokens');
jest.mock('@/lib/mail');

jest.mock('@/routes', () => ({
  DEFAULT_LOGIN_REDIRECT: 'mockRedirectURL',
}));

describe('login', () => {
  const mockValues: z.infer<typeof loginSchema> = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create an instance of AuthError', () => {
    const errorMessage = 'This is an error message';
    const error = new AuthError(errorMessage);

    expect(error).toBeInstanceOf(AuthError);
    expect(error.message).toBe(errorMessage);
  });

  it('should return an error if fields are invalid', async () => {
    // Mock the schema to return an invalid result
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: false,
      error: new z.ZodError([]),
    });

    const result = await login(mockValues);

    expect(result).toEqual({ error: 'Invalid fields!' });
    expect(loginSchema.safeParse).toHaveBeenCalledWith(mockValues);
  });

  it('should return an error if the email does not exist', async () => {
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    const result = await login(mockValues);

    expect(result).toEqual({ error: "Email doesn't exist!" });
    expect(getUserByEmail).toHaveBeenCalledWith(mockValues.email);
  });

  it('should send a confirmation email if the user is not verified', async () => {
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      password: 'hashedPassword',
      emailVerified: false,
    });

    (generateVerificationToken as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      token: 'verificationToken',
    });

    const result = await login(mockValues);

    expect(result).toEqual({ success: 'Confirmation email sent!' });
    expect(generateVerificationToken).toHaveBeenCalledWith(mockValues.email);
    expect(sendVerificationEmail).toHaveBeenCalledWith(
      mockValues.email,
      'verificationToken',
    );
  });

  it('should return an error if credentials are invalid', async () => {
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      password: 'hashedPassword',
      emailVerified: true,
    });

    (signIn as jest.Mock).mockRejectedValueOnce(
      new AuthError('Invalid credentials', { type: 'CredentialsSignin' }),
    );

    const result = await login(mockValues);

    expect(result).toEqual({ error: 'Something went wrong!' });
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: mockValues.email,
      password: mockValues.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  });

  it('should return a generic error for other authentication errors', async () => {
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      password: 'hashedPassword',
      emailVerified: true,
    });

    (signIn as jest.Mock).mockRejectedValueOnce(
      new AuthError('Unknown error', { type: 'UnknownError' }),
    );

    const result = await login(mockValues);

    expect(result).toEqual({ error: 'Something went wrong!' });
  });

  it('should throw an error for non-AuthError exceptions', async () => {
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      password: 'hashedPassword',
      emailVerified: true,
    });

    const unexpectedError = new Error('Unexpected error');
    (signIn as jest.Mock).mockRejectedValueOnce(unexpectedError);

    await expect(login(mockValues)).rejects.toThrow(unexpectedError);
  });

  it('should successfully log in a verified user', async () => {
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      email: mockValues.email,
      password: 'hashedPassword',
      emailVerified: true,
    });

    (signIn as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await login(mockValues);

    expect(result).toBeUndefined();
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: mockValues.email,
      password: mockValues.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  });
});
