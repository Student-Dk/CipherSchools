import express from "express";
import { getSchema } from "../controllers/schemaController.js";

const router = express.Router();

router.get("/", getSchema);

export default router;