/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {

    setupFilesAfterEnv: ['./src/setupTests.ts'],
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,
    testMatch: ['<rootDir>/src/**/*.test.(js|jsx|ts|tsx)'],

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
        '^.+\\.(scss)$': 'jest-css-modules-transform'
    },

    moduleNameMapper: {
        '\\.(png|css)$': '<rootDir>/src/mock/fileMock.ts'
    },

    // coveragePathIgnorePatterns: [
    //     '/node_modules/',
    //     '\\.scss$',
    // ],

}
