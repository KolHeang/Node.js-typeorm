import { Request,Response } from "express";
import { authService } from "../services/auth.services";
import { AuthDto } from "../dto/auth.dto";
import { ValidatorDTO } from "../decorators/ValidatorDTO";
import { UserDto } from "../dto/user.dto";

class AuthController {
    @ValidatorDTO(UserDto)
    public async register(req: Request, res: Response) {
        try {
            const userDto: UserDto = req.body;
            const user = await authService.register(userDto);
            return res.status(201).json({
                status: true,
                message: "User created successfully",
                data: user,
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Internal server error",
            });
        }
    }
    @ValidatorDTO(AuthDto)
    public async login(req: Request, res: Response) {
        try {
            const authDto: AuthDto = req.body;
            const login = await authService.login(authDto);
            return res.status(200).json({
                status: true,
                message: "Login successful",
                data: login
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Internal server error",
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
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Internal server error",
            });
        }
    }
    public async logout(req: Request, res: Response) {
        try {
            const result = await authService.logout(res);
            return res.status(200).json({result});
        } catch (error) {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Internal server error",
            });
        }
    }

    public async enableTwoFactor(req: Request, res: Response) {
        try {
            const user = (req as any).user; // Assuming user is set in middleware
            const result = await authService.enableTwoFactor(user);
            return res.status(200).json({
                status: true,
                message: "2FA enabled",
                data: result,
            });
        } catch (error) {
            console.error('Error enabling 2FA:', error);
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || "Internal server error",
            });
        }
    }

    public async verifyTwoFactor(req: Request, res: Response) {
        try {
            const tempToken = req.headers.authorization?.split(' ')[1];
            console.log('tempToken', tempToken);
            if (!tempToken) {
                return res.status(400).json({
                    status: false,
                    message: "2FA token is required",
                });
            }
            const { totp } = req.body;
            if (!totp) {
                return res.status(400).json({
                    status: false,
                    message: "TOTP code is required",
                });
            }
            const result = await authService.verifyTwoFactor(tempToken, totp);
            return res.status(200).json({
                status: true,
                message: "2FA verified",
                data: result,
            });
        } catch (error) {
            console.error('Error verifying 2FA:', error);
            return res.status(error.code || 500).json({
                status: false,
                message: error.message || "Internal server error",
            });
        }
    }
}
export const authController = new AuthController();