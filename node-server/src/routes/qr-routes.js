import express from "express";
import QRController from "../controller/qr-controller.js";
import { verifyToken } from "../middlewares/verify-token.js";



const router = express.Router();
const qrController = new QRController();

router.post("/sms", verifyToken, qrController.generateSmsQrCode.bind(qrController));
router.post("/mail", verifyToken, qrController.generateMailQrCode.bind(qrController));
router.post("/wifi", verifyToken, qrController.generateWifiQrCode.bind(qrController));
router.post("/vcard", verifyToken, qrController.generateVCardQrCode.bind(qrController));
router.post("/url", verifyToken, qrController.generateUrlQrCode.bind(qrController));
router.get("/:id", verifyToken, qrController.getQrCode.bind(qrController));
router.get("/", verifyToken, qrController.listQrCodes.bind(qrController));
router.delete("/:id", verifyToken, qrController.deleteQrCode.bind(qrController));

export default router;