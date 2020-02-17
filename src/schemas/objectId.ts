import Joi from "@hapi/joi";

import Validate from "../helpers/validate";

export default Joi.custom((value: any, helpers: any) => {
  if (!Validate.objectId(value)) {
    return helpers.error("ObjectId is invalid");
  }

  return value;
});
