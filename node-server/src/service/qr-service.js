import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import crypto from "crypto";
import { fileURLToPath } from "url";
import pool from "../config/database.js";

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

      const result = await client.query(
        `INSERT INTO qr_codes (user_id, type, data, generated_content, qr_code_image, label) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [userId, type, data, generatedContent, qrCodeImagePath, label]
      );

      const qrCode = result.rows[0];

      // Log tablosuna ekleme
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
}
