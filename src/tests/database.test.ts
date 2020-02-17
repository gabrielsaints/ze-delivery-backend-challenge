import Database from "../config/database";

describe("Database", () => {
  afterEach(async () => {
    await Database.disconnect();
  });
  test("`database` shouLd connect and disconnect to mongodb without errors", async () => {
    expect.assertions(1);
    const response = await Database.connect();
    expect(response).toBe(true);
  });

  test("`database` should return error if doens't exists any MONGO_URI environment variable", async () => {
    expect.assertions(1);
    await expect(Database.connect(false)).rejects.toThrow();
  });
});
