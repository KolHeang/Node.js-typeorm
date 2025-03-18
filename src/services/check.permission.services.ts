import { userRepository } from "../repositories/user.repository";

export const checkPermission = async (permissionName: string, userId: number) => {
    const user = await userRepository.findOne({ 
        where: { id: userId },
        relations: ["roles", "roles.permissions"] 
    });
    if (!user) {
        throw new Error("User not found");
    }
    return user.roles.permissions.some((permission) => permission.slug === permissionName);
}