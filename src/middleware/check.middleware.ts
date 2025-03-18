import { Request, Response, NextFunction } from "express";
import { checkPermission } from "../services/check.permission.services";

export const checkPermissionMiddleware = (permissionName: string) => {
    return async (req: Request & { user?: { id: string } }, res: Response, next: NextFunction) => {
        const userId = (req as any).user?.id;
        const hasPermission = await checkPermission(permissionName, userId);
        if (!hasPermission) {
            return res.status(403).json({
                status: false,
                message: "permission access denied",
            });
        }
        next();
    };
};