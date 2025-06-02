import express from "express";
import DecisionController from "../controllers/decision-controller";
import { verifyToken } from "../middleware/verify-token";


const router = express.Router();
const decisionController = new DecisionController();


router.post("/", verifyToken, decisionController.createDecision.bind(decisionController));
router.get("/", verifyToken, decisionController.showAllDecisions.bind(decisionController));
router.get("/:id", verifyToken, decisionController.showDecision.bind(decisionController));
router.put("/:id", verifyToken, decisionController.updateDecision.bind(decisionController));
router.delete("/:id", verifyToken, decisionController.deleteDecision.bind(decisionController));

export default router;