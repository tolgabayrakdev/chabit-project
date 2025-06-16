import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { sendEmail } from "../utils/send-email.js";
import crypto from "crypto";
import pool from "../config/database.js";
import HttpException from "../exceptions/http-exception.js";

export default class AuthService {

    async login(email, password) {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            throw new HttpException(404, "User not found");
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new HttpException(401, "Invalid password");
        }

        // ✅ Doğrulama kontrolü
        if (!user.is_verified) {
            throw new HttpException(403, "Please verify your email before logging in.");
        }

        const accessToken = generateAccessToken({ id: user.id, role: "user" });
        const refreshToken = generateRefreshToken({ id: user.id, role: "user" });

        return { accessToken, refreshToken };
    }



    async register(user) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const existingUser = await client.query(
                "SELECT * FROM users WHERE email = $1",
                [user.email]
            );

            if (existingUser.rows.length > 0) {
                throw new HttpException(409, "Email already exists");
            }

            const hashedPassword = await hashPassword(user.password);
            const emailVerifyToken = crypto.randomBytes(32).toString("hex");
            const tokenCreatedAt = new Date();

            const newUser = await client.query(`
            INSERT INTO users (email, password, is_verified, email_verify_token, email_verify_token_created_at)
            VALUES ($1, $2, false, $3, $4)
            RETURNING email
            `, [user.email, hashedPassword, emailVerifyToken, tokenCreatedAt]);

            await client.query("COMMIT");

            // ✅ Email gönder
            const verifyUrl = `https://vunqr.com/verify-email?token=${emailVerifyToken}`;
            await sendEmail(
                user.email,
                "E-posta Doğrulama",
                `
                <h2>Hoş Geldin!</h2>
                <p>Hesabını doğrulamak için aşağıdaki bağlantıya tıkla:</p>
                <a href="${verifyUrl}" target="_blank">Hesabımı Doğrula</a>
                <p>Bu bağlantı bir süre sonra geçersiz olabilir.</p>
                `
            );

            return newUser.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    async verifyEmail(token) {
        const result = await pool.query(`
    SELECT email_verify_token_created_at FROM users WHERE email_verify_token = $1
  `, [token]);

        if (result.rows.length === 0) {
            throw new HttpException(400, "Invalid or expired token");
        }

        const tokenCreatedAt = result.rows[0].email_verify_token_created_at;
        const now = new Date();
        const diffMs = now - tokenCreatedAt;
        const diffHours = diffMs / (1000 * 60 * 60);

        if (diffHours > 1) {
            throw new HttpException(400, "Token expired. Please register again.");
        }

        await pool.query(`
    UPDATE users 
    SET is_verified = true, email_verify_token = NULL, email_verify_token_created_at = NULL
    WHERE email_verify_token = $1
  `, [token]);

        return { message: "Email verified successfully" };
    }

    async resendVerificationEmail(email) {
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        const user = result.rows[0];

        if (!user) {
            throw new HttpException(404, "User not found");
        }

        if (user.is_verified) {
            throw new HttpException(400, "Email is already verified");
        }

        const now = new Date();

        if (user.email_verify_token_created_at) {
            const diffMs = now - new Date(user.email_verify_token_created_at);
            const diffMinutes = diffMs / (1000 * 60);

            // ✅ 1. Token hâlâ geçerliyse (1 saat içinde)
            if (diffMinutes < 60) {
                // ✅ 2. Son gönderim üzerinden 5 dakika geçmedi ise
                if (diffMinutes < 5) {
                    throw new HttpException(429, "Please wait a few minutes before requesting a new verification email.");
                }

                // 🟡 Aynı token'ı tekrar gönder
                const verifyUrl = `https://seninfrontendsite.com/verify-email?token=${user.email_verify_token}`;
                await sendEmail(
                    email,
                    "E-posta Doğrulama (Yineleme)",
                    `
          <h2>Yeniden Hoş Geldin!</h2>
          <p>Mevcut doğrulama bağlantınız hâlâ geçerli:</p>
          <a href="${verifyUrl}" target="_blank">Hesabımı Doğrula</a>
          <p>Bu bağlantı ${60 - Math.floor(diffMinutes)} dakika daha geçerli.</p>
        `
                );

                return { message: "Verification email resent (same token)" };
            }
        }

        // 🔄 Yeni token oluştur ve kaydet
        const newToken = crypto.randomBytes(32).toString("hex");
        const newCreatedAt = new Date();

        await pool.query(`
    UPDATE users 
    SET email_verify_token = $1, email_verify_token_created_at = $2
    WHERE email = $3
  `, [newToken, newCreatedAt, email]);

        const verifyUrl = `https://seninfrontendsite.com/verify-email?token=${newToken}`;
        await sendEmail(
            email,
            "Yeni E-posta Doğrulama Bağlantısı",
            `
      <h2>Merhaba!</h2>
      <p>İşte yeni doğrulama bağlantınız:</p>
      <a href="${verifyUrl}" target="_blank">Hesabımı Doğrula</a>
      <p>Bu bağlantı 1 saat geçerlidir.</p>
    `
        );

        return { message: "New verification email sent." };
    }



    async verifyUser(token) {
        try {
            if (!token) {
                throw new HttpException(401, "Unauthorized");
            }
            const payload = verifyToken(token);
            const user = await pool.query("SELECT email FROM users WHERE id = $1", [payload.id]);
            return {
                email: user.rows[0].email
            };
        } catch (error) {
            throw new HttpException(500, (error).message);
        }

    }
}