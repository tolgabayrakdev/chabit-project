import AuthService from "../service/auth-service.js";

export default class AuthController {

    constructor() {
        this.authService = new AuthService();
    }


    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.cookie('access_token', result.accessToken, { httpOnly: true });
            res.cookie('refresh_token', result.refreshToken, { httpOnly: true });
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const result = await this.authService.register({ name, email, password });
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
    async verifyUser(req, res, next) {
        try {
            const token = req.cookies.access_token;
            const user = await this.authService.verifyUser(token);
            res.status(200).json({message: "User verified successfully", user: user});
        } catch (error) {
            next(error);
        }
    }
}