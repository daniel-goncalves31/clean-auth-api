module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1"
  },
  testMatch: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
