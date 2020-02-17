import request from "../utils/request";
import Normalize from "../utils/normalize";

describe("Example", () => {
  beforeAll(async () => {
    await Normalize.beforeAll();
  });

  afterAll(async () => {
    await Normalize.afterAll();
  });

  test("`GET /example` should return `200`", async () => {
    expect.assertions(1);

    const response = await request().get("/example");

    expect(response.status).toBe(200);
  });
});
