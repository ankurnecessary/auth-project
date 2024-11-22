import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { login } from '@/actions/login';
import { loginSchema } from '@/schemas';
import * as z from 'zod';

// Mock the signIn function
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

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

  it('should return undefined if fields are valid and signIn is successful', async () => {
    // Mock the schema to return a valid result
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (signIn as jest.Mock).mockResolvedValueOnce({});

    const result = await login(mockValues);

    expect(loginSchema.safeParse).toHaveBeenCalledWith(mockValues);
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: mockValues.email,
      password: mockValues.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    expect(result).toBeUndefined();
  });

  it('should return "Invalid credentials!" when CredentialsSignin error occurs', async () => {
    // Arrange: Mock credentials that match the expected schema shape
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    const credentialsSigninError = new AuthError();
    credentialsSigninError.type = 'CredentialsSignin';
    (signIn as jest.Mock).mockRejectedValueOnce(credentialsSigninError);

    // Act
    const result = await login(mockValues);

    // Assert
    expect(result).toEqual({ error: 'Invalid credentials!' });
  });

  it('should return "Something went wrong!" when an error occurs not of type CredentialsSignin', async () => {
    // Arrange

    // Mock the schema to return a valid result
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    (signIn as jest.Mock).mockRejectedValueOnce(new AuthError());

    // Act
    const result = await login(mockValues);

    // Assert
    expect(result).toEqual({ error: 'Something went wrong!' });
  });
});
