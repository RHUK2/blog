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
    '\\.svg$': '<rootDir>/__mocks__/svg.js',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};

const configForSvgr = async () => {
  const jestConfig = await createJestConfig(config)();

  return {
    ...jestConfig,
    moduleNameMapper: {
      '\\.(svg)$': '<rootDir>/__mocks__/svg.js',
      ...jestConfig.moduleNameMapper,
    },
  };
};

export default configForSvgr;
