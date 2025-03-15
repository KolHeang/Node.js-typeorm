import UserService from "../services/user.services";
import { Request, Response } from "express";

class UserController {
  static async registerUser(req: Request, res: Response): Promise<any> {
    try {
      const { username, password, email, role } = req.body;
      const checkUser = await UserService.getUserByEmail(email);
      if (checkUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const user = await UserService.createUser(username, email, password, role);
      const { password: _, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async getUsers(req: Request, res: Response): Promise<any> {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async getUserById(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(parseInt(id));

      if (!user) {
        return res.status(404).json({ message: "User not found : " + id });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const { refreshToken } = req.body;
      const user = await UserService.refreshToken(refreshToken);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
  static async logout(req: Request, res: Response): Promise<any> {
    try {
      const { refreshToken } = req.body;
      const user = await UserService.logout(refreshToken);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
export default UserController;
