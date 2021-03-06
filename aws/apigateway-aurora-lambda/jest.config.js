module.exports = {
  collectCoverageFrom: [
    './**/*.js',
    '!models/*.*',
    '!utils/migrateUtils.js',
    '!utils/testUtils.js',
    '!runMigrations.js',
    '!getHost.js',
    '!setDBEnvironment.js',
    '!migrations/**/*.js',
    '!babel.config.js',
    '!.eslintrc.js',
    '!jest.config.js',
    '!webpack.config.js',
    '!coverage/**/*.js',
    '!utils/constants.js',
    '!mocks/**/*.js',
    '!.webpack/**/*.*'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  },
  moduleNameMapper: {
    '@(models|utils|services)(.*)$': '<rootDir>/$1/$2',
    '@mocks(.*)$': '<rootDir>/__mocks__/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};
