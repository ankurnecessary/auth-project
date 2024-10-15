describe('Prisma Client in Development Mode', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env }; // Clone the environment variables
    jest.resetModules(); // Reset module cache to simulate fresh imports
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'development'; // Temporarily override NODE_ENV
  });

  afterEach(() => {
    process.env = originalEnv; // Restore the original environment after each test
  });

  test('should create only one instance of PrismaClient in development mode', async () => {
    const { default: prismaInstance1 } = await import('@/lib/db');
    const { default: prismaInstance2 } = await import('@/lib/db');

    // Verify that both instances are the same
    expect(prismaInstance1).toBe(prismaInstance2);
  });
});
