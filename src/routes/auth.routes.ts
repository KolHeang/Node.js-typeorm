import express from "express";
import { authController } from "../controllers/auth.controllers";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/register", authController.register as any);
router.post("/login", authController.login as any);
router.post("/refresh-token", authController.refreshToken as any);
router.post("/logout", authController.logout as any);
router.post("/2fa/setup", authMiddleware, authController.enableTwoFactor as any);
router.post("/2fa/verify", authMiddleware, authController.verifyTwoFactor as any);

export { router as authRoutes };