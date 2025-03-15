import express from "express";
import { authController } from "../controllers/auth.controllers";
const router = express.Router();

router.post("/login", authController.login as any);
router.post("/refresh-token", authController.refreshToken as any);
router.post("/logout", authController.logout as any);

export { router as authRoutes };