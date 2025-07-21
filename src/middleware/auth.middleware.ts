import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository';
import { User } from '../entities/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Check for token in Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                status: false,
                message: 'Unauthorized',
            });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({
                status: false,
                message: 'Invalid token format',
            });
            return;
        }

        // Verify JWT
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & { id: number; requires2FA?: boolean };

        // Find user with roles
        const user = await userRepository.findOne({
            where: { id: decoded.id },
            relations: ['roles'],
        });

        if (!user) {
            res.status(401).json({
                status: false,
                message: 'User not found',
            });
            return;
        }

        // Check if 2FA is required
        if (user.isTwoFactorEnabled && decoded.requires2FA) {
            res.status(403).json({
                status: false,
                message: '2FA verification required',
            });
            return;
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            status: false,
            message: 'Authentication failed',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
        return;
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