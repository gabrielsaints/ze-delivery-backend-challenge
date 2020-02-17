import { RequestHandler } from "express";

const example: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).send("ok");
  } catch (err) {
    next(err);
  }
};

export { example };
