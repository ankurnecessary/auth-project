import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { login } from '@/actions/login';
import { loginSchema } from '@/schemas';
import * as z from 'zod';

// Mock the schema validation
jest.mock('@/schemas', () => ({
  loginSchema: {
    safeParse: jest.fn(),
  },
}));

// Mock the signIn function
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
}));

jest.mock('next-auth', () => {
  return {
    AuthError: jest.fn().mockImplementation(function (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this: any,
      message: string,
    ) {
      this.name = 'AuthError';
      this.message = message;
    }),
  };
});

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
});
