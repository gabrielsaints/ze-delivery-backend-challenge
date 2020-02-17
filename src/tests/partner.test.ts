import Normalize from "./utils/normalize";
import Partner, { isPartner } from "../models/partners";
import chance from "./utils/chance";
import randomPartner from "./mocks/randomPartner";

describe("Partners", () => {
  beforeAll(async () => Normalize.beforeAll());

  afterAll(async () => Normalize.afterAll());

  test("`find` should return an empty array", async () => {
    expect.assertions(1);
    const response = await Partner.find({});

    expect(response).toHaveLength(0);
  });

  test("`findOne` should return null", async () => {
    expect.assertions(1);
    const response = await Partner.findOne({
      name: chance.string()
    });

    expect(response).toBe(null);
  });

  test("`findById` should return null", async () => {
    expect.assertions(1);
    const response = await Partner.findById(chance.objectId());

    expect(response).toBe(null);
  });

  test("`save & remove` should add a new partner and remove him", async () => {
    expect.assertions(4);

    const partner = new Partner(randomPartner());

    await partner.save();

    let found = await Partner.findById(partner.id);

    expect(found).toBeDefined();
    expect(found).toBeInstanceOf(Partner);
    expect(isPartner(partner.serialize())).toBe(true);

    await partner.remove();
    found = await Partner.findById(partner.id);

    expect(found).toBe(null);
  });
});
