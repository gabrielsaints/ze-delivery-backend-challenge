// eslint-disable-next-line no-undef
module.exports = {
  verbose: true,
  coverageDirectory: "./src/tests/coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: ["dotenv/config"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/**/*.spec.ts",
    "!<rootDir>/src/**/*.test.ts",
    "!<rootDir>/src/**/__*__/*"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testRegex: ["(/tests/.*(\\.test))\\.[t]sx?$"]
};
