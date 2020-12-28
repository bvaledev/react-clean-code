module.exports = {
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
     // "isolatedModules": false,
    }
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper : {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
