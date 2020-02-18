import { RequestHandler } from "express";
import Partner, { PartnerSchema } from "../models/partners";
import RequestError from "../helpers/request-error";

const all: RequestHandler = async (req, res, next) => {
  try {
    const partners = await Partner.find({});

    res.status(200).json({
      partners: await Promise.all(partners.map(partner => partner.serialize()))
    });
  } catch (err) {
    next(err);
  }
};

const store: RequestHandler = async (req, res, next) => {
  try {
    const {
      ownerName,
      tradingName,
      document,
      coverageArea,
      address
    } = req.body;

    const found = await Partner.findOne({ document });

    if (found) {
      throw new RequestError(400, "The `document` partner is already inserted");
    }

    const partner = new Partner({
      document,
      ownerName,
      tradingName,
      address,
      coverageArea
    } as PartnerSchema);

    await partner.save();

    res.status(201).json({
      partner: await partner.serialize()
    });
  } catch (err) {
    next(err);
  }
};

export { all, store };
