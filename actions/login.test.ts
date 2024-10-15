import { login } from '@/actions/login';
import { loginSchema } from '@/schemas';
import * as z from 'zod';

// Mock the schema validation
jest.mock('@/schemas', () => ({
  loginSchema: {
    safeParse: jest.fn(),
  },
}));

describe('login', () => {
  const mockValues = {
    email: 'test@example.com',
    password: 'password123',
  };

  beforeEach(() => {
    jest.clearAllMocks();
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

  it('should return a success message if fields are valid', async () => {
    // Mock the schema to return a valid result
    jest.spyOn(loginSchema, 'safeParse').mockReturnValueOnce({
      success: true,
      data: mockValues,
    });

    const result = await login(mockValues);

    expect(result).toEqual({ success: 'Email sent!' });
    expect(loginSchema.safeParse).toHaveBeenCalledWith(mockValues);
  });
});
