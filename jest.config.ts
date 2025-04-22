import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/__mocks__/svg.js',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};

const nextConfig = async () => {
  const getConfig = await createJestConfig(config)();

  if (getConfig.transformIgnorePatterns?.[0])
    getConfig.transformIgnorePatterns[0] = '/node_modules/(?!react-markdown)/';

  return getConfig;
};

export default nextConfig;
