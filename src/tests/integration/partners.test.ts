import request from "../utils/request";
import Normalize from "../utils/normalize";
import randomPartner from "../mocks/randomPartner";
import Partner from "../../models/partners";

describe("API Partners", () => {
  beforeAll(async () => {
    await Normalize.beforeAll();
  });

  afterAll(async () => {
    await Normalize.afterAll();
  });

  test("`GET /partners` should return `200` with empty array of partners", async () => {
    expect.assertions(2);

    const response = await request().get("/partners");

    expect(response.status).toBe(200);
    expect(response.body.partners).toHaveLength(0);
  });

  test("`POST /partners` should return `422` using invalid schema", async () => {
    expect.assertions(1);

    const response = await request().post("/partners");

    expect(response.status).toBe(422);
  });

  test("`POST /partners` should return `201` with a partner", async () => {
    expect.assertions(3);

    const random = randomPartner();

    const response = await request()
      .post("/partners")
      .send(random);

    expect(response.status).toBe(201);
    expect(response.body.partner).toBeDefined();

    const partner = await Partner.findById(response.body.partner._id);

    if (partner) {
      expect(partner).toBeInstanceOf(Partner);
      await partner.remove();
    }
  });

  test("`POST /partners` should return `400` using duplicated partner", async () => {
    expect.assertions(4);

    const random = randomPartner();

    const response = await request()
      .post("/partners")
      .send(random);

    expect(response.status).toBe(201);
    expect(response.body.partner).toBeDefined();

    const duplicated = await request()
      .post("/partners")
      .send(random);

    expect(duplicated.status).toBe(400);

    const partner = await Partner.findById(response.body.partner._id);

    if (partner) {
      expect(partner).toBeInstanceOf(Partner);
      await partner.remove();
    }
  });
});
