import express from "express";
import { generateHint } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/hint", generateHint);

export default router;