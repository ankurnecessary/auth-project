import { getUserByEmail, getUserById } from '@/data/user';
import { prismaMock } from '../singleton';

test('should get user by email', async () => {
  const user = {
    id: '1',
    name: 'Rich',
    email: 'hello@prisma.io',
    emailVerified: null,
    image: null,
    password: null,
    createdAt: new Date('2024-10-14T06:19:40.128Z'),
    updatedAt: new Date('2024-10-14T06:19:40.128Z'),
  };

  prismaMock.user.findUnique.mockResolvedValue(user);

  await expect(getUserByEmail(user.email)).resolves.toEqual({
    id: '1',
    name: 'Rich',
    email: 'hello@prisma.io',
    emailVerified: null,
    image: null,
    password: null,
    createdAt: new Date('2024-10-14T06:19:40.128Z'),
    updatedAt: new Date('2024-10-14T06:19:40.128Z'),
  });
});

test('should return null when user is not found', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null); // No user found

  const result = await getUserByEmail('non-existing-email');

  expect(result).toBeNull();
  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { email: 'non-existing-email' },
  });
});

test('should return null when there is a database error while fetching user by email', async () => {
  prismaMock.user.findUnique.mockRejectedValue(new Error('Database error')); // Simulate a DB error

  const result = await getUserByEmail('hello@world.com');

  expect(result).toBeNull();
  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { email: 'hello@world.com' },
  });
});

test('should get user by valid id', async () => {
  const mockUser = {
    id: '1',
    name: 'Rich',
    email: 'hello@prisma.io',
    emailVerified: null,
    image: null,
    password: null,
    createdAt: new Date('2024-10-14T06:19:40.128Z'),
    updatedAt: new Date('2024-10-14T06:19:40.128Z'),
  };

  prismaMock.user.findUnique.mockResolvedValue(mockUser);

  await expect(getUserById('1')).resolves.toEqual(mockUser);
  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { id: '1' },
  });
});

test('should return null when user is not found', async () => {
  prismaMock.user.findUnique.mockResolvedValue(null); // No user found

  const result = await getUserById('non-existing-id');

  expect(result).toBeNull();
  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { id: 'non-existing-id' },
  });
});

test('should return null when there is a database error while fetching user by id', async () => {
  prismaMock.user.findUnique.mockRejectedValue(new Error('Database error')); // Simulate a DB error

  const result = await getUserById('1');

  expect(result).toBeNull();
  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { id: '1' },
  });
});
