import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
    public static async createUser(
        username: string,
        email: string,
        password: string,
        role: string = "user"
    ) {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = UserRepository.create({
        username,
        email,
        password: passwordHash,
        role,
        });
        return await UserRepository.save(user);
    }
    public static async getUserByEmail(email: string) {
        return await UserRepository.findOneBy({ email });
    }
    public static async getUserById(id: number) {
        return await UserRepository.findOneBy({ id });
    }
    public static async getUsers() {
        return await UserRepository.find();
    }
    
    public static async login(email: string, password: string) {
        const user = await UserRepository.findOneBy({ email });
        if (!user) {
        throw new Error("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
        throw new Error("Invalid password");
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
        expiresIn: "1d",
        });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: "7d",
    });
        user.refreshToken = refreshToken;
        await UserRepository.save(user);
        return { token, refreshToken };
    }
  public static async refreshToken(refreshToken: string) {
    const user = await UserRepository.findOneBy({ refreshToken: refreshToken });
    if (!user) {
      return { message: "User not found" };
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
    const refreshTokens = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: "7d",
    });
    user.refreshToken = refreshTokens;
    await UserRepository.save(user);
    return { token, refreshToken };
  }
  public static async logout(refreshToken: string) {
    const user = await UserRepository.findOneBy({ refreshToken });
    if (!user) {
      return { message: "User not found" };
    }
    user.refreshToken = "";
    await UserRepository.save(user);
    return { message: "Logout successfully" };
  }
}
export default UserService;
