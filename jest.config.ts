/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config: Config = {
  projects: [
    '<rootDir>/jest.frontend.config.ts', // Points to frontend Jest config
  ],
  collectCoverageFrom: [
    'components/!(ui)/**/*.{js,jsx,ts,tsx}',
    'components/*.{js,jsx,ts,tsx}',
    '!components/**/*.stories.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.stories.{js,jsx,ts,tsx}',
    '!lib/**/*.{js,jsx,ts,tsx}',
  ],
  collectCoverage: true,
  coverageProvider: 'v8',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
