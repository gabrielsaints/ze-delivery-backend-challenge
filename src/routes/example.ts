import express from "express";

import { example } from "../controllers/example";

const router = express.Router();

router.get("/example", example);

export default router;
