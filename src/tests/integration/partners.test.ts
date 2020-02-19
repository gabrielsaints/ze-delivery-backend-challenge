import request from "../utils/request";
import Normalize from "../utils/normalize";
import randomPartner from "../mocks/randomPartner";
import Partner, { isPartner } from "../../models/partners";
import chance from "../utils/chance";
import mockPartners from "../mocks/mockPartners";
import mockLocation from "../mocks/mockLocation";

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

  test("`GET /partners/:id` should return `422` using invalid schema", async () => {
    expect.assertions(1);

    const response = await request().get(`/partners/${chance.integer()}`);

    expect(response.status).toBe(422);
  });

  test("`GET /partners/:id` should return `404` with no partner found", async () => {
    expect.assertions(1);

    const response = await request().get(`/partners/${chance.objectId()}`);

    expect(response.status).toBe(404);
  });

  test("`GET /partners/:id` should return `200` with a partner", async () => {
    expect.assertions(3);

    const partner = new Partner(randomPartner());

    await partner.save();

    const response = await request().get(`/partners/${partner.id}`);

    await partner.remove();

    expect(response.status).toBe(200);
    expect(response.body.partner).toBeDefined();
    expect(isPartner(response.body.partner)).toBe(true);
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

  test("`GET /partners/nearby` should return `422` using invalid schema", async () => {
    expect.assertions(1);

    const response = await request().get(`/partners/nearby`);

    expect(response.status).toBe(422);
  });

  test("`GET /partners/nearby` should return `404` with no partner nearby", async () => {
    expect.assertions(1);
    const response = await request()
      .get(`/partners/nearby`)
      .query({
        longitude: chance.longitude(),
        latitude: chance.latitude()
      });

    expect(response.status).toBe(404);
  });

  test("`GET /partners/nearby` should return `200` with the nearby partner", async () => {
    expect.assertions(6);

    const partnersMock = mockPartners();
    await Partner.insertMany(partnersMock);
    const response = await request()
      .get("/partners/nearby")
      .query(mockLocation);

    expect(response.status).toBe(200);
    expect(response.body.partner).toBeDefined();
    expect(response.body.partner.distanceInMeters).toBeDefined();

    const partner = await Partner.findById(response.body.partner._id);

    expect(partner).toBeDefined();
    expect(partner).toBeInstanceOf(Partner);

    await Partner.deleteMany({});

    const partners = await Partner.find();

    expect(partners).toHaveLength(0);
  });
});
