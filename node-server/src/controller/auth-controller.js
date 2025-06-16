import AuthService from "../service/auth-service.js";

export default class AuthController {

    constructor() {
        this.authService = new AuthService();
    }


    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.cookie('access_token', result.accessToken, { httpOnly: true, secure: true, sameSite: "none" });
            res.cookie('refresh_token', result.refreshToken, { httpOnly: true, secure: true, sameSite: "none" });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.register({ email, password });
            res.status(201).json({
                message: "User registered successfully",
                user: result
            });
        } catch (error) {
            next(error);
        }
    }
    async logout(_req, res, next) {
        try {
            res.clearCookie('access_token');
            res.clearCookie('refresh_token');
            res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            next(error);
        }
    }
    async verifyEmail(req, res, next) {
        try {
            const { token } = req.query;
            const result = await this.authService.verifyEmail(token);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    async resendVerificationEmail(req, res, next) {
        try {
            const { email } = req.body;
            const result = await this.authService.resendVerificationEmail(email);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    async verifyUser(req, res, next) {
        try {
            const token = req.cookies.access_token;
            const user = await this.authService.verifyUser(token);
            res.status(200).json({ message: "User verified successfully", user: user });
        } catch (error) {
            next(error);
        }
    }
}