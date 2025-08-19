import { In } from "typeorm";
import { UserDto } from "../dto/user.dto";
import { roleRepository } from "../repositories/role.repository";
import { userRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
class UserServices {
    public async createUser(user: UserDto) {
        const password = await bcrypt.hash(user.password, 10);
        const role = user.rolesId ? await roleRepository.findOne({ where: { id: user.rolesId } }) : null;
        const newUser = userRepository.create({ 
            username: user.username, 
            email: user.email, 
            password,
            roles: role
        });
        return await userRepository.save(newUser);
    }
    public async getAllUsers(page: number, limit: number) {
        const [users, total] = await userRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: users,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    public async getUserById(id: number) {
        const user = await userRepository.findOne({ where: { id } });
        return user;
    }
    public async updateUser(id: number, user: UserDto) {
        const userToUpdate = await userRepository.findOne({ where: { id } });
        if (!userToUpdate) {
            throw new Error("User not found");
        }
        userToUpdate.username = user.username;
        userToUpdate.email = user.email;
        userToUpdate.password = await bcrypt.hash(user.password, 10);
        userToUpdate.roles = user.rolesId ? await roleRepository.findOne({ where: { id: user.rolesId } }) : null;
        return await userRepository.save(userToUpdate);
    }
}
export const userService = new UserServices();