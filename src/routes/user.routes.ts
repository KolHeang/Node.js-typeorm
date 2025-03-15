import express from "express";
import { userController } from "../controllers/user.controllers";

const router = express.Router();

router.post('/users', userController.createUser as any);
router.get('/users', userController.getAllUsers as any);
router.get('/users/:id', userController.getUserById as any);
router.put('/users/:id', userController.updateUser as any);

export { router as userRoutes };