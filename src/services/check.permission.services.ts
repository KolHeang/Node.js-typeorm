import { NotFoundException } from "../exceptions/exceptions";
import { userRepository } from "../repositories/user.repository";

export const checkPermission = async (permissionName: string, userId: number) => {
    const foundUser = await userRepository.findOne({ 
        where: { id: userId},
        relations: ["roles", "roles.permissions"] 
    });

    if (!foundUser) {
        throw new NotFoundException("User not found")
    }
    
    return foundUser.roles.permissions.some((permission) => permission.slug === permissionName);
}