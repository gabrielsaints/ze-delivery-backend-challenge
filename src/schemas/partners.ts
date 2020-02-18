import Joi from "@hapi/joi";

const latitudeAndLongitude = Joi.array()
  .items(Joi.number().required(), Joi.number().required())
  .length(2);

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
