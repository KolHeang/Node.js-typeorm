import express from "express";
import { userController } from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.post('/users', userController.createUser);
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:id', authMiddleware, userController.getUserById);
router.put('/users/:id', authMiddleware, userController.updateUser);

export { router as userRoutes };