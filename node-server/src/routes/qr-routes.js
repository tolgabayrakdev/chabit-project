import express from "express";
import QRController from "../controller/qr-controller.js";
import { verifyToken } from "../middlewares/verify-token.js";



const router = express.Router();
const qrController = new QRController();

router.post("/generate-sms-qr", verifyToken, qrController.generateSmsQrCode.bind(qrController));
router.post("/generate-mail-qr", verifyToken, qrController.generateMailQrCode.bind(qrController));

export default router;