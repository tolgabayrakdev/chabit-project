import { generateAccessToken, generateRefreshToken, verifyToken } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";
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

        const accessToken = generateAccessToken({ id: user.id, role: "user" });
        const refreshToken = generateRefreshToken({ id: user.id, role: "user" });

        return { accessToken, refreshToken };
    }


    async register(user) {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");

            const existingUser = await client.query("SELECT * FROM users WHERE email = $1", [user.email]);
            if (existingUser.rows.length > 0) {
                throw new HttpException(409, "Email already exists");
            }

            const hashedPassword = await hashPassword(user.password);
            const newUser = await client.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email", [user.name, user.email, hashedPassword]);
            await client.query("COMMIT");
            return newUser.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }


    async verifyUser(token) {
        try {
            if (!token) {
                throw new HttpException(401, "Unauthorized");
            }
            const payload = verifyToken(token);
            const user = await pool.query("SELECT name, email FROM users WHERE id = $1", [payload.id]);
            return {
                name: user.rows[0].name,
                email: user.rows[0].email
            };
        } catch (error) {
            throw new HttpException(500, (error).message);
        }

    }
}