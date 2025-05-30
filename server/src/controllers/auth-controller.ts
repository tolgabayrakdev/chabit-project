import HttpException from "../exceptions/http-exception";
import AuthService from "../service/auth-service";
import { Request, Response } from "express";


class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const result = await this.authService.login(email, password);
            res.cookie('access_token', result.accessToken, { httpOnly: true });
            res.cookie('refresh_token', result.refreshToken, { httpOnly: true });
            res.status(200).json(result);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    async register(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;
            const result = await this.authService.register({ name, email, password });
            res.status(201).json({
                message: "User registered successfully",
                user: result
            });
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    async verifyUser(req: Request, res: Response) {
        try {
            const token: string = req.cookies.access_token;
            if (!token) {
                throw new HttpException(401, 'Unauthorized');
            }
            const user = await this.authService.verifyUser(token);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof HttpException) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    async adminAccessDemo(_req: Request, res: Response) {
        res.status(200).json({ message: 'Admin access granted' });
    }

    async logout(_req: Request, res: Response) {
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.status(200).json({ message: 'Logout successful' });
    }
}

export default AuthController;