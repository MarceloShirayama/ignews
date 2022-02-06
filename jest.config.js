module.exports = {
  testPathIgnorePatterns: ["node_modules", ".next"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(css|scss|sass|less)$": "<rootDir>/node_modules/identity-obj-proxy",
  },
};
