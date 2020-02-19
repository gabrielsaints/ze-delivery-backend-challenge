import express from "express";

import { all, store, getNearby, unique } from "../controllers/partners";
import Validate from "../helpers/validate";
import {
  postPartners,
  getPartnersNearby,
  getPartner
} from "../schemas/partners";

const router = express.Router();

router.get(
  "/partners/nearby",
  Validate.fields("query", getPartnersNearby),
  getNearby
);

router.get("/partners/:id", Validate.fields("params", getPartner), unique);
router.get("/partners", all);
router.post("/partners", Validate.fields("body", postPartners), store);

export default router;
