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
        const user = await userRepository.findOne({ where: { email: auth.email } });
        if (user) {
            throw new BadRequestException("User already exists");
        }

        const hashedPassword = await bcrypt.hash(auth.password, 10);
        const newUser = userRepository.create({
            ...auth,
            password: hashedPassword,
        });
        const resutl = await userRepository.save(newUser);
        return resutl;
    }
    public async login(auth: AuthDto) {
        const user = await userRepository.findOne({ where: { email: auth.email } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        console.log('user', user);
        const isPasswordValid = await bcrypt.compare(auth.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password or email");
        }

        if (user.isTwoFactorEnabled) {
            const tempToken = jwt.sign({ userId: user.id, requires2FA: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
            console.log('tempToken', tempToken);
            return {
                status: true,
                tempToken,
                message: "2FA required",
                
            };
        }
        
        const token = jwt.sign({ userId:user.id,username:user.username,email:user.email,roles:user.roles }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId:user.id,username:user.username,email:user.email,roles:user.roles }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        console.log('token', token, 'refreshToken', refreshToken);
        return {
            token,
            refreshToken,
        };
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

    // Enable 2FA and generate QR code
    public async enableTwoFactor(user: User) {
        const users = await userRepository.findOne({ where: { id: user.id } });
        if (!users) {
            throw new NotFoundException("User not found");
        }
        const secret = speakeasy.generateSecret({
            name: `MyApp:${user.email}`,
        });

        user.twoFactorSecret = secret.base32;
        user.isTwoFactorEnabled = true;
        await userRepository.save(user);
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);
        return {
            qrCodeUrl,
            secret: secret.base32,
        };
    }

    // Verify 2FA code
    public async verifyTwoFactor(tempToken: string, totp: string) {
        const decoded = jwt.verify(tempToken, process.env.JWT_SECRET) as { userId: number, requires2FA: boolean };
        console.log('decoded', decoded);
        if (!decoded.requires2FA) {
            throw new BadRequestException("2FA not enabled");
        }
        const user = await userRepository.findOne({ where: { id: decoded.userId } });
        console.log('user', user);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        console.log('user.twoFactorSecret', user.twoFactorSecret, 'token', totp);
        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: "base32",
            token: totp,
            window: 1, // Allow a 1-minute window for clock skew
        });
        console.log('verified', verified);
        if (!verified) {
            throw new BadRequestException("Invalid 2FA token");
        }

        const accessToken = jwt.sign({ userId: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId: user.id, username: user.username, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        return { token: accessToken, refreshToken };
    }
}
export const authService = new AuthService();