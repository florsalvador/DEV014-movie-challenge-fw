/* eslint-env node */

module.exports = {
  collectCoverage: true,
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.css$": "identity-obj-proxy",
    "^.+\\.(css|png|jpg|jpeg|svg)$": "<rootDir>/test/__mocks__/fileMock.cjs",
  },
};
