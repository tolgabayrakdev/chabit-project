import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'secret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'secret';

export function generateAccessToken(payload) {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: '15m' });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '7d' });
}

export function verifyToken(token, type = 'access') {
    const secret = type === 'access' ? accessTokenSecret : refreshTokenSecret;
    return jwt.verify(token, secret);
}
