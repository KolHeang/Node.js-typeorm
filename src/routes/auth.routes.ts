import express from "express";
import { authController } from "../controllers/auth.controllers";
import { authMiddleware } from "../middleware/auth.middleware";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.post("/2fa/setup", authMiddleware, authController.enableTwoFactor);
router.post("/2fa/verify", authMiddleware, authController.verifyTwoFactor);

export { router as authRoutes };