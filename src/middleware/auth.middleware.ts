import { Request, Response, NextFunction } from "express";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import dotenv from "dotenv";
dotenv.config();

export const authentification = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(400).json({
                status:false,
                message: "Unauthorized Token" 
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await userRepository.findOne({
            where: {
                id: decoded.id,
            },
            relations: ["roles"],
        });
        console.log("user:", user);
        if (!user) {
            return res.status(400).json({ 
                status: false,
                message: "Unauthorized" 
            });
        }
        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message:"Internal Server Error",
            error: error,
        });
    }
};
