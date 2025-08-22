import express from "express";
import { userController } from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post('/users', userController.createUser as any);
router.get('/users', authMiddleware, userController.getAllUsers as any);
router.get('/users/:id', authMiddleware, userController.getUserById as any);
router.put('/users/:id', authMiddleware, userController.updateUser as any);

export { router as userRoutes };