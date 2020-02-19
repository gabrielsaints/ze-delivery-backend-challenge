import { RequestHandler } from "express";
import Partner, { PartnerSchema } from "../models/partners";
import RequestError from "../helpers/request-error";

export const all: RequestHandler = async (req, res, next) => {
  try {
    const partners = await Partner.find({});

    res.status(200).json({
      partners: await Promise.all(partners.map(partner => partner.serialize()))
    });
  } catch (err) {
    next(err);
  }
};

export const unique: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const partner = await Partner.findById(id);

    if (!partner) {
      throw new RequestError(404, "no partner found");
    }

    res.status(200).json({
      partner: await partner.serialize()
    });
  } catch (err) {
    next(err);
  }
};

export const store: RequestHandler = async (req, res, next) => {
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

export const getNearby: RequestHandler = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;

    const partner = await Partner.findByMyLocation({
      longitude,
      latitude
    });

    if (!partner) {
      throw new RequestError(404, "no partner nearby");
    }

    partner.__v = undefined;

    res.status(200).json({
      partner: partner
    });
  } catch (err) {
    next(err);
  }
};
