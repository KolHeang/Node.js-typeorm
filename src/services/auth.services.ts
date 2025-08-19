import { userRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthDto } from "../dto/auth.dto";
import dotenv from "dotenv";
import { UserDto } from "../dto/user.dto";
import { User } from "../entities/User";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { BadRequestException, NotFoundException, UnauthorizedException } from "../exceptions/exceptions";
dotenv.config();

class AuthService {
    public async register(auth:UserDto) {
        const passwordHash = await bcrypt.hash(auth.password, 10);
        const user = userRepository.create({
            username: auth.username,
            email: auth.email,
            password: passwordHash,
            isTwoFactorEnabled: false,
        })
        await userRepository.save(user);
        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            },
        };
    }

    public async login(auth: AuthDto) {
        const { email, password } = auth;
        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }

        // if (user.isTwoFactorEnabled) {
        //     // Generate temporary token for 2FA verification
        //     const tempToken = jwt.sign(
        //         { userId: user.id, requires2FA: true },
        //         process.env.JWT_SECRET!,
        //         { expiresIn: '5m' }
        //     );
        //     return { tempToken, requires2FA: true };
        // }

        // No 2FA, issue tokens directly
        const accessToken = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: '7d' }
        );

        return { token: accessToken, refreshToken, requires2FA: false };
    }

    public async refreshToken(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as { userId: string };
        const user = await userRepository.findOne({ where: { id: Number(decoded.userId) } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const tokens = jwt.sign({ userId: user.id, username: user.username, email: user.email, roles: user.roles }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId: user.id, username: user.username, email: user.email, roles: user.roles }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        return {
            token: tokens,
            refreshToken: refreshToken,
        };
    }

    public async logout(res) {
        res.clearCookie("token", { path: "/" });
        res.clearCookie("refreshToken", { path: "/" });
        return {
            status: true,
            message: "Logout successful",
        };
    }

    // Enable Two-Factor Authentication
    public async enableTwoFactor(user: User) {
        const tempSecret = speakeasy.generateSecret({
            name: `MyApp:${user.email}`,
        });
        user.twoFactorSecret = tempSecret.base32;
        user.isTwoFactorEnabled = true;
        await userRepository.save(user);
        const qrCodeUrl = await qrcode.toDataURL(tempSecret.otpauth_url);
        return {
            secret: tempSecret.base32,
            qrCodeUrl,
        };
    }

    // Verify 2FA code
    public async verifyTwoFactor(tempToken: string, totp: string) {
        let decoded: { userId: number; requires2FA: boolean };
        try {
            decoded = jwt.verify(tempToken, process.env.JWT_SECRET!) as { userId: number; requires2FA: boolean };
        } catch (e) {
            throw new BadRequestException('Invalid or expired temporary token');
        }
        
        if (!decoded.requires2FA) {
            throw new BadRequestException('2FA not enabled');
        }

        const user = await userRepository.findOne({ where: { id: decoded.userId }, relations: ['roles'] });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const twoFactorSecret = user.twoFactorSecret;
        if (!twoFactorSecret) {
            throw new BadRequestException('No 2FA secret found');
        }

        const verified = await speakeasy.totp.verify({
            secret: twoFactorSecret,
            encoding: 'base32',
            token: totp,
            window: 2, // Allow a 2-minute window for clock drift
        });
        
        if (!verified) {
            throw new BadRequestException('Invalid 2FA token');
        }

        // If using temp_secret, make it permanent
        if (user.twoFactorSecret) {
            user.twoFactorSecret = twoFactorSecret;
            user.isTwoFactorEnabled = true;
            await userRepository.save(user);
        }

        const accessToken = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: '7d' }
        );

        return { token: accessToken, refreshToken };
    }
}
export const authService = new AuthService();