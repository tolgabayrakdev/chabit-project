import QrService from "../service/qr-service.js";

export default class QRController {

    constructor() {
        this.qrService = new QrService();
    }

    async generateSmsQrCode(req, res, next) {
        try {
            const userId = req.user.id;
            const { number, sms, label } = req.body;
            const qrCode = await this.qrService.generateSmsQrCode(userId, number, sms, label);
            res.status(200).json(qrCode);
        } catch (error) {
            next(error);
        }
    }

    async generateMailQrCode(req, res, next) {
        try {
            const userId = req.user.id;
            const { email, subject, body, label } = req.body;
            const qrCode = await this.qrService.generateMailQrCode(userId, email, subject, body, label);
            res.status(200).json(qrCode);
        } catch (error) {
            next(error);
        }
    }
    async generateWifiQrCode(req, res, next) {
        try {
            const userId = req.user.id;
            const { ssid, password, encryption = "WPA", hidden = false, label } = req.body;
            const qrCode = await this.qrService.generateWifiQrCode(userId, ssid, password, encryption, hidden, label);
            res.status(200).json(qrCode);
        } catch (error) {
            next(error);
        }
    }

    async generateVCardQrCode(req, res, next) {
        try {
            const userId = req.user.id;
            const { label, ...vcardData } = req.body;
            const qrCode = await this.qrService.generateVCardQrCode(userId, vcardData, label);
            res.status(200).json(qrCode);
        } catch (error) {
            next(error);
        }
    }

    async generateUrlQrCode(req, res, next) {
        try {
            const userId = req.user.id;
            const { url, label } = req.body;
            const qrCode = await this.qrService.generateUrlQrCode(userId, url, label);
            res.status(200).json(qrCode);
        } catch (error) {
            next(error);
        }
    }

}