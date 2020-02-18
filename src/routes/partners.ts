import express from "express";

import { all, store } from "../controllers/partners";
import Validate from "../helpers/validate";
import { postPartners } from "../schemas/partners";

const router = express.Router();

router.get("/partners", all);
router.post("/partners", Validate.fields("body", postPartners), store);

export default router;
