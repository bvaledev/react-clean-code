module.exports = {
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
     // "isolatedModules": false,
    }
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper : {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy' // identity-obj-proxy usa um teste double gerando um dummy {} para nao interferir no teste
  }
}
