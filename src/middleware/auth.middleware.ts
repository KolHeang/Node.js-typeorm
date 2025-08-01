import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { User } from '../entities/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Check for token in Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: false,
                message: 'Invalid token format',
            });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                status: false,
                message: 'Token is required',
            });
        }

        // Verify JWT
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & { userId: number; requires2FA?: boolean };

        // Find user with roles
        const user = await userRepository.findOne({
            where: { id: decoded.userId },
            relations: ['roles'],
        });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'User not found',
            });
        }

        if (user.isTwoFactorEnabled && decoded.requires2FA) {
            return res.status(403).json({
                status: false,
                message: 'Two-factor authentication required',
            });
        }


        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            status: false,
            message: error.message || 'Unauthorized',
        });
    }
};

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
        user?: User; // Use the full User entity type
        }
    }
}