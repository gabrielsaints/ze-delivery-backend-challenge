import Normalize from "./utils/normalize";
import Partner, { isPartner } from "../models/partners";
import chance from "./utils/chance";
import randomPartner from "./mocks/randomPartner";
import mockPartners from "./mocks/mockPartners";

describe("Model Partners", () => {
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

  test('`randomPartner` should return a randomized partner of "import.json" list', async () => {
    expect.assertions(3);

    const random = randomPartner();

    expect(random).toBeDefined();

    const partner = new Partner(random);

    await partner.save();

    expect(partner).toBeInstanceOf(Partner);
    expect(isPartner(partner)).toBe(true);

    await partner.remove();
  });

  test("`save` should add a new partner and then remove him", async () => {
    expect.assertions(3);

    const partner = new Partner(randomPartner());

    await partner.save();

    const found = await Partner.findById(partner.id);

    expect(found).toBeDefined();
    expect(found).toBeInstanceOf(Partner);
    expect(isPartner(await partner.serialize())).toBe(true);

    await partner.remove();
  });

  test("`save` should update a partner and then remove him", async () => {
    expect.assertions(7);

    const partner = new Partner(randomPartner());

    await partner.save();

    const first = await Partner.findById(partner.id);

    expect(first).toBeDefined();
    expect(first).toBeInstanceOf(Partner);

    if (first) {
      expect(isPartner(await first.serialize())).toBe(true);
    }

    partner.ownerName = chance.name();

    await partner.save();

    const second = await Partner.findById(partner.id);

    expect(second).toBeDefined();
    expect(second).toBeInstanceOf(Partner);

    if (second) {
      expect(isPartner(await second.serialize())).toBe(true);
    }

    expect(first?.ownerName).not.toEqual(second?.ownerName);

    await partner.remove();
  });

  test("`mockPartners` should be able to return a pack of partners and insert it", async () => {
    expect.assertions(3);

    const partnersMock = mockPartners();
    expect(partnersMock).toBeDefined();
    await Partner.insertMany(partnersMock);

    let partners = await Partner.find({});
    expect(partners).toHaveLength(partnersMock.length);

    await Partner.deleteMany({});
    partners = await Partner.find({});
    expect(partners).toHaveLength(0);
  });
});
