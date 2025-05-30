import HttpException from "../exceptions/http-exception";
import UserRepository from "../repository/user-repository";
import { Helper } from "../util/helper"


export default class AuthService {

    private helper: Helper;
    private userRepository: UserRepository;

    constructor() {
        this.helper = new Helper();
        this.userRepository = new UserRepository();
    }

    async login(email: string, password: string) {
        const hashedPassword = this.helper.passwordHash(password);
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new HttpException(404, "User not found");
        }
        if (user.password !== hashedPassword) {
            throw new HttpException(401, "Invalid password");
        }
        const accessToken = this.helper.generateAccessToken({ id: user.id, role: "user" });
        const refreshToken = this.helper.generateRefreshToken({ id: user.id, role: "user" });
        return { accessToken, refreshToken };
    }

    async register(user: any) {
        const client = await this.userRepository.beginTransaction();
        try {
            const existingEmail = await this.userRepository.findByEmail(user.email);
            if (existingEmail) {
                throw new HttpException(409, "Email already exists");
            }
            const hashedPassword = this.helper.passwordHash(user.password);
            const newUser = await this.userRepository.createUser({
                name: user.name,
                email: user.email,
                password: hashedPassword
            });
            await this.userRepository.commitTransaction(client);
            delete newUser.password;
            delete newUser.id;
            return newUser;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await this.userRepository.rollbackTransaction(client);
            throw new HttpException(500, (error as Error).message);

        }
    }

    async verifyUser(token: string) {
        try {
            const payload: any = this.helper.decodeToken(token);                        
            const user = await this.userRepository.findById(payload.id);
            if (!user) {
                throw new HttpException(404, 'User not found!');
            }
            return {
                name: user.name,
                email: user.email
                };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new HttpException(500, (error as Error).message);
        }
    }

}