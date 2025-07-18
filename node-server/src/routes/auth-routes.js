import express from "express";
import { schemaValidation } from "../middlewares/schema-validation.js";
import { userSchema } from "../schema/user-schema.js";
import AuthController from "../controller/auth-controller.js";


const router = express.Router();
const authController = new AuthController();

router.post("/login", authController.login.bind(authController));
router.post(
    "/register",
    schemaValidation(userSchema),
    authController.register.bind(authController
    ));
router.post("/logout", authController.logout.bind(authController));
router.get("/verify-email", authController.verifyEmail.bind(authController));
router.get("/resend-verification-email", authController.resendVerificationEmail.bind(authController));
router.get("/me", authController.verifyUser.bind(authController));


export default router;