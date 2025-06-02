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


export default router;