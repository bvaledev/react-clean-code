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
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper : {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
