import express from "express";
import UserController from "../controllers/user.controllers";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.post("/login", UserController.login);
router.post("/refresh-token", UserController.refreshToken);
router.get("/logout", UserController.logout);

export default router;
