import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import crypto from "crypto";
import { fileURLToPath } from "url";
import pool from "../config/database.js";
import HttpException from "../exceptions/http-exception.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "../../");

export default class QrService {
  async generateQrCodeImage(content, filename) {
    const outputPath = path.join(rootDir, "uploads", "qr-codes", filename);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    await QRCode.toFile(outputPath, content, {
      type: "png",
      errorCorrectionLevel: "H",
      width: 300,
    });

    return `/uploads/qr-codes/${filename}`;
  }

  async saveQrCodeDb(userId, type, data, generatedContent, qrCodeImagePath, label = null) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1. Kullanıcının planı
      const userResult = await client.query(
        `SELECT plan FROM users WHERE id = $1`,
        [userId]
      );

      if (userResult.rowCount === 0) {
        throw new HttpException(404, "Kullanıcı bulunamadı.");
      }

      const userPlan = userResult.rows[0].plan;

      // 2. Plan "free" ise bugünkü QR kayıtlarını say
      if (userPlan === "free") {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0); // UTC başlangıcı

        const qrCountResult = await client.query(
          `SELECT COUNT(*) FROM qr_codes 
         WHERE user_id = $1 AND created_at >= $2`,
          [userId, today.toISOString()]
        );

        const todayQrCount = parseInt(qrCountResult.rows[0].count);

        if (todayQrCount >= 3) {
          throw new HttpException(429, "Free kullanıcılar günde en fazla 3 QR kodu oluşturabilir.");
        }
      }

      // 3. QR oluştur
      const qrResult = await client.query(
        `INSERT INTO qr_codes (user_id, type, data, generated_content, qr_code_image, label) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [userId, type, data, generatedContent, qrCodeImagePath, label]
      );

      const qrCode = qrResult.rows[0];

      // 4. Log kaydı oluştur
      await client.query(
        `INSERT INTO qr_generation_logs (user_id, qr_code_id) VALUES ($1, $2)`,
        [userId, qrCode.id]
      );

      await client.query("COMMIT");
      return qrCode;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }



  async generateSmsQrCode(userId, number, sms, label = null) {
    const generatedContent = `SMSTO:${number}:${sms}`;
    const data = { number, sms };
    const filename = `qr_${crypto.randomUUID()}.png`;

    const qrCodeImagePath = await this.generateQrCodeImage(generatedContent, filename);
    return await this.saveQrCodeDb(userId, "sms", data, generatedContent, qrCodeImagePath, label);
  }

  async generateMailQrCode(userId, email, subject, body, label = null) {
    const generatedContent = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const data = { email, subject, body };
    const filename = `qr_${crypto.randomUUID()}.png`;

    const qrCodeImagePath = await this.generateQrCodeImage(generatedContent, filename);
    return await this.saveQrCodeDb(userId, "mail", data, generatedContent, qrCodeImagePath, label);
  }

  async generateWifiQrCode(userId, ssid, password, encryption = "WPA", hidden = false, label = null) {
    const hiddenFlag = hidden ? "true" : "false";
    const generatedContent = `WIFI:T:${encryption};S:${ssid};P:${password};H:${hiddenFlag};;`;
    const data = { ssid, password, encryption, hidden };
    const filename = `qr_${crypto.randomUUID()}.png`;

    const qrCodeImagePath = await this.generateQrCodeImage(generatedContent, filename);
    return await this.saveQrCodeDb(userId, "wifi", data, generatedContent, qrCodeImagePath, label);
  }

  async generateVCardQrCode(userId, vcardData, label = null) {
    const {
      firstName,
      lastName,
      phone,
      email,
      company,
      title,
      website,
      address
    } = vcardData;

    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${lastName};${firstName};;;`,
      `FN:${firstName} ${lastName}`,
      company && `ORG:${company}`,
      title && `TITLE:${title}`,
      phone && `TEL:${phone}`,
      email && `EMAIL:${email}`,
      website && `URL:${website}`,
      address && `ADR:;;${address};;;;`,
      "END:VCARD"
    ].filter(Boolean); // boş satırları çıkarır

    const generatedContent = lines.join("\n");

    const data = { ...vcardData };
    const filename = `qr_${crypto.randomUUID()}.png`;
    const qrCodeImagePath = await this.generateQrCodeImage(generatedContent, filename, label);

    return await this.saveQrCodeDb(userId, "vcard", data, generatedContent, qrCodeImagePath, label);
  }

  async generateUrlQrCode(userId, url, label = null) {
    const data = { url };
    const generatedContent = url;
    const filename = `qr_${crypto.randomUUID()}.png`;

    const qrCodeImagePath = await this.generateQrCodeImage(generatedContent, filename, label);
    return await this.saveQrCodeDb(userId, "url", data, generatedContent, qrCodeImagePath, label);
  }


}
