import { Request,Response } from "express";
import { authService } from "../services/auth.services";
import { AuthDto } from "../dto/auth.dto";
import { ValidatorDTO } from "../decorators/ValidatorDTO";

class AuthController {
    @ValidatorDTO(AuthDto)
    public async login(req: Request, res: Response) {
        try {
            const authDto: AuthDto = req.body;
            const { token, refreshToken } = await authService.login(authDto);
            return res.status(200).json({
                status: true,
                message: "Login successful",
                data: {
                    token,
                    refreshToken,
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    public async refreshToken(req: Request, res: Response) {
        try {
            const token = req.body.token;
            const { token: newToken, refreshToken } = await authService.refreshToken(token);
            return res.status(200).json({
                status: true,
                message: "Token refreshed",
                data: {
                    token: newToken,
                    refreshToken,
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const result = await authService.logout(res);
            return res.status(200).json({result});
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
export const authController = new AuthController();