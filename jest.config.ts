import type { Config } from 'jest'
import nextJest from 'next/jest'
import { pathsToModuleNameMapper } from 'ts-jest'

// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: process.env.CI ? ['lcov'] : ['json', 'lcov', 'html', 'text'],
  setupFiles: ['jest-date-mock', `<rootDir>/src/jest/jest-shim.js`],
  setupFilesAfterEnv: ['<rootDir>/src/jest/jest.setup.js'],
  preset: 'ts-jest',
  roots: ['<rootDir>'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  modulePathIgnorePatterns: [
    '<rootDir>/.circleci',
    '<rootDir>/.github',
    '<rootDir>/.next',
    '<rootDir>/node_modules',
    '<rootDir>/public',
    '<rootDir>/mocks',
    '<rootDir>/dist/'
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  reporters: [
    'default',
    [
      'jest-sonar',
      {
        outputDirectory: 'sonarqube-report/',
        outputName: 'sonarqube-report.xml',
        reportedFilePath: 'absolute'
      }
    ]
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/mocks',
    '<rootDir>/src/core/constant',
    '<rootDir>/src/core/redux',
    '<rootDir>/src/core/hooks/usePrevious',
    '<rootDir>/src/core/utils/delay',
    '<rootDir>/src/jest',
    '<rootDir>/src/context',
    '<rootDir>/src/i18n',
    '<rootDir>/src/components/atoms/icons',
    '<rootDir>/src/components/organism/ContentHeader',

    // consider for auth page
    '<rootDir>/src/pages',

    // write later
    '<rootDir>/src/core/hooks/useAuth',
    '<rootDir>/src/core/hooks/useLoadApp',
    '<rootDir>/src/core/libs/mfid',
    '<rootDir>/src/core/utils/form', // CT 196
    '<rootDir>/src/core/utils/withUserPermission',
    '<rootDir>/src/components/template',
    '<rootDir>/src/components/molecules/ButtonDropdown', // no use now
    '<rootDir>/src/helpers'
  ],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
    '^antd/es/(.*)$': '<rootDir>/node_modules/antd/lib/$1'
  },
  snapshotResolver: '<rootDir>/src/jest/jest.snapshot.js',
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true // automate clear mocks
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig)
