import express from "express";
import { executeQuery, getSchemaByAssignment, testConnection } from "../controllers/sqlController.js";

const router = express.Router();


router.post("/execute", executeQuery);
router.get("/schema/:id", getSchemaByAssignment);

export default router;

