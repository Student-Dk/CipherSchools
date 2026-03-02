import express from "express";
import { createAssignment, deleteAssignment, getAllAssignments, getAssignmentById, updateAssignment } from "../controllers/assignmentController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", getAllAssignments);
router.post("/",verifyToken, createAssignment);
router.get("/:id", getAssignmentById);
router.put("/:id",verifyToken, updateAssignment);

router.delete("/:id", verifyToken,deleteAssignment);


export default router;