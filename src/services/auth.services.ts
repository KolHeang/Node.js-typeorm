import { userRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthDto } from "../dto/auth.dto";
import dotenv from "dotenv";
dotenv.config();

class AuthService {
    public async login(auth: AuthDto) {
        const user = await userRepository.findOne({ where: { email: auth.email } });
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(auth.password, user.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            throw new Error("Invalid password or email");
        }
        
        const token = jwt.sign({ userId:user.id,username:user.username,email:user.email,roles:user.roles }, process.env.JWT_SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ userId:user.id,username:user.username,email:user.email,roles:user.roles }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        return {
            token,
            refreshToken,
        };
    }
    public async refreshToken(token: string) {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as { userId: string };
        const user = await userRepository.findOne({ where: { id: Number(decoded.userId) } });
        if (!user) {
            throw new Error("User not found");
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
}
export const authService = new AuthService();