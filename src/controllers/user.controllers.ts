import { Request, Response } from 'express';
import { UserDto } from '../dto/user.dto';
import { ValidatorDTO } from '../decorators/ValidatorDTO';
import { userService } from '../services/user.services';
class UserController {
    @ValidatorDTO(UserDto)
    public async createUser(req: Request, res: Response) {
        try {
            const userDto: UserDto = req.body; 
            const newUser = await userService.createUser(userDto);
            return res.status(201).json({
                status: true,
                message: "User created successfully",
                data: newUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    public async getAllUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const users = await userService.getAllUsers(page, limit);
            return res.status(200).json({
                status: true,
                message: "Users get successfully",
                data: users,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    public async getUserById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const user = await userService.getUserById(id);
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found",
                    data: {},
                });
            }
            return res.status(200).json({
                status: true,
                message: "User get successfully",
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
    @ValidatorDTO(UserDto)
    public async updateUser(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const userDto: UserDto = req.body;
            const updatedUser = await userService.updateUser(id, userDto);
            return res.status(200).json({
                status: true,
                message: "User updated successfully",
                data: updatedUser,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: "Internal server error",
                error: error.message,
            });
        }
    }
}
export const userController = new UserController();