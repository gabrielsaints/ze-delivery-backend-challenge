/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ObjectSchema } from "@hapi/joi";
import { RequestHandler } from "express";
import { Types } from "mongoose";

import RequestError from "../helpers/request-error";

type FieldTypeRequest = "params" | "query" | "body";

abstract class Validate {
  public static fields(
    field: FieldTypeRequest,
    schema: ObjectSchema
  ): RequestHandler {
    return (req, _, next) => {
      try {
        let data = {};

        if (field === "body") {
          data = req.body;
        } else if (field === "params") {
          data = req.params;
        } else if (field === "query") {
          data = req.query;
        }

        const response = schema.validate(data);

        if (response.error) {
          throw new RequestError(422, response.error.message);
        }

        if (field === "body") {
          req.body = response.value;
        } else if (field === "params") {
          req.params = response.value;
        } else if (field === "query") {
          req.query = response.value;
        }

        next();
      } catch (err) {
        next(err);
      }
    };
  }

  public static objectId(id: string | any): boolean {
    return Types.ObjectId.isValid(id);
  }
}

export default Validate;
