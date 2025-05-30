import jwt from "jsonwebtoken";
import Crypto from "crypto";


export class Helper {
    generateAccessToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY as string || 'jwt-secret', { expiresIn: '30min' });
    }

    generateRefreshToken(payload: object): string {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY as string || 'jwt-secret', { expiresIn: '7d' });
    }

    decodeToken(token: string) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET_KEY as string || 'jwt-secret');
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    passwordHash(password: string) {
        return Crypto.createHash('sha256').update(password).digest('base64');
    }

    comparePassword(password: string, hash: string): boolean {
        return this.passwordHash(password) === hash;
    }


}