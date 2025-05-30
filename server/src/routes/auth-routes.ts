import express from "express";
import AuthController from "../controllers/auth-controller";
import { verifyRole } from "../middleware/verify-role";
import { verifyToken } from "../middleware/verify-token";

const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get("/verify", authController.verifyUser.bind(authController));
router.get("/logout", authController.logout.bind(authController));
router.get("/admin",verifyToken,verifyRole(['admin']) ,authController.adminAccessDemo.bind(authController));

export default router;