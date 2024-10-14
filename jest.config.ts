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
    '<rootDir>/jest.backend.config.ts', // Points to backend Jest config
  ],
  collectCoverageFrom: [
    'components/!(ui)/**/*.{js,jsx,ts,tsx}',
    'components/*.{js,jsx,ts,tsx}',
    '!components/**/*.{stories,test}.{js,jsx,ts,tsx}',
    'app/**/*.{js,jsx,ts,tsx}',
    '!app/**/*.{stories,test}.{js,jsx,ts,tsx}',
    'lib/**/*.{js,ts}',
    '!lib/**/*.test.{js,ts}',
    'data/**/*.{js,ts}',
    '!data/**/*.test.{js,ts}',
  ],
  collectCoverage: true,
  coverageProvider: 'v8',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
