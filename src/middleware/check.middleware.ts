import { Request, Response, NextFunction } from "express";
import { checkPermission } from "../services/check.permission.services";

export const checkPermissionMiddleware = (permissionName: string) => {
    return async (req: Request & { user?: { id: string } }, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            if (!userId) {
                return res.status(401).json({
                    status: false,
                    message: "User not authenticated",
                });
            }

            const hasPermission = await checkPermission(permissionName, userId);

            if (!hasPermission) {
                return res.status(403).json({
                    status: false,
                    message: "Permission access denied",
                });
            }

            next();
        } catch (error) {
            res.status(error.code).json({
                status: false,
                message: error.message || "Internal server error",
            });
        }
    };
};