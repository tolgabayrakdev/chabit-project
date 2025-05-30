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
}

export default AuthController;