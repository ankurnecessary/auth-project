import bcrypt from 'bcryptjs';
import { loginSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import authConfig from '@/auth.config'; // Path to your auth config file

jest.mock('@/schemas', () => ({
  loginSchema: {
    safeParse: jest.fn(),
  },
}));

jest.mock('@/data/user', () => ({
  getUserByEmail: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  default: jest.fn((config) => ({
    ...config,
    authorize: (credentials: Partial<Record<string, unknown>>, req?: Request) =>
      config.authorize(credentials, req),
  })),
}));

describe('authorize function in NextAuth credentials provider', () => {
  const credentials = {
    email: 'user@example.com',
    password: 'testpassword',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return null if credentials validation fails', async () => {
    // Arrange: Mock the schema validation to fail
    (loginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: false,
    });

    // Act: Call authorize with invalid credentials
    const result =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
      (authConfig.providers[0].authorize as (credentials: any) => any)(
        credentials,
      );

    // Assert: Expect null to be returned
    expect(result).toBeNull();
  });

  it('should return null if user is not found', async () => {
    // Arrange: Mock successful schema validation and no user found
    (loginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: credentials,
    });
    (getUserByEmail as jest.Mock).mockResolvedValueOnce(null);

    // Act
    const result =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
      (authConfig.providers[0].authorize as (credentials: any) => any)(
        credentials,
      );

    // Assert
    expect(getUserByEmail).toHaveBeenCalledWith(credentials.email);
    expect(result).toBeNull();
  });

  it('should return null if user has no password (social login only)', async () => {
    // Arrange: Mock user with no password
    (loginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: credentials,
    });
    (getUserByEmail as jest.Mock).mockResolvedValueOnce({
      email: credentials.email,
      password: null,
    });

    // Act
    const result =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
      (authConfig.providers[0].authorize as (credentials: any) => any)(
        credentials,
      );

    // Assert
    expect(result).toBeNull();
  });

  it('should return user if password matches', async () => {
    // Arrange: Mock user with matching password
    const mockUser = { email: credentials.email, password: 'hashedpassword' };
    (loginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: credentials,
    });
    (getUserByEmail as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    // Act
    const result =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
      (authConfig.providers[0].authorize as (credentials: any) => any)(
        credentials,
      );

    // Assert
    expect(bcrypt.compare).toHaveBeenCalledWith(
      credentials.password,
      mockUser.password,
    );
    expect(result).toEqual(mockUser);
  });

  it('should return null if password does not match', async () => {
    // Arrange: Mock user with a non-matching password
    const mockUser = { email: credentials.email, password: 'hashedpassword' };
    (loginSchema.safeParse as jest.Mock).mockReturnValueOnce({
      success: true,
      data: credentials,
    });
    (getUserByEmail as jest.Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    // Act
    const result =
      await // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
      (authConfig.providers[0].authorize as (credentials: any) => any)(
        credentials,
      );

    // Assert
    expect(bcrypt.compare).toHaveBeenCalledWith(
      credentials.password,
      mockUser.password,
    );
    expect(result).toBeNull();
  });
});
