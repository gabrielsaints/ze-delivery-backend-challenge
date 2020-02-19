import Joi from "@hapi/joi";
import objectId from "./objectId";

const latitudeAndLongitude = Joi.array()
  .items(Joi.number().required(), Joi.number().required())
  .length(2);

export const getPartner = Joi.object().keys({
  id: objectId
});

export const postPartners = Joi.object().keys({
  ownerName: Joi.string().required(),
  tradingName: Joi.string().required(),
  document: Joi.string()
    .replace(/[^\d]/g, "")
    .required(),
  address: Joi.object().keys({
    type: Joi.string()
      .equal("Point")
      .default("MultiPolygon"),
    coordinates: latitudeAndLongitude.required()
  }),
  coverageArea: Joi.object().keys({
    type: Joi.string()
      .equal("MultiPolygon")
      .default("MultiPolygon"),
    coordinates: Joi.array()
      .items(
        Joi.array().items(
          Joi.array()
            .items(latitudeAndLongitude)
            .min(1)
        )
      )
      .required()
  })
});

export const getPartnersNearby = Joi.object().keys({
  latitude: Joi.number()
    .max(90)
    .min(-90)
    .required(),
  longitude: Joi.number()
    .max(180)
    .min(-180)
    .required()
});
