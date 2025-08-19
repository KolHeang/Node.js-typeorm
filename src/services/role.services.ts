import { In } from "typeorm";
import { RoleDto } from "../dto/role.dto";
import { permissionRepository } from "../repositories/permission.repository";
import { roleRepository } from "../repositories/role.repository";
import { Role } from "../entities/Role";


class RoleService {
    public async getAllRoles() {
        return await roleRepository.find();
    }
    public async getRoleById(id: number) {
        return await roleRepository.findOneBy({ id });
    }
    public async createRole(role: RoleDto): Promise<any> {
        const permissions= await permissionRepository.findBy({id: In(role.permissions)});
        if (permissions.length !== role.permissions.length) {
            throw new Error("Some permissions not found");
        }
        const newRole = new Role();
        newRole.name = role.name;
        newRole.permissions = permissions;
        return await roleRepository.save(newRole);
    }
    public async updateRole(id: number, role: RoleDto) {
        const permissions= await permissionRepository.findBy({id: In(role.permissions)});
        if (permissions.length !== role.permissions.length) {
            throw new Error("Some permissions not found");
        }
        const roleToUpdate = await roleRepository.findOneBy({ id });
        if (!roleToUpdate) {
            throw new Error("Role not found");
        }
        roleToUpdate.name = role.name;
        roleToUpdate.permissions = permissions;
        return await roleRepository.save(roleToUpdate);
    }
    public async deleteRole(id: number) {
        const roleToDelete = await roleRepository.findOneBy({ id });
        if (!roleToDelete) {
            throw new Error("Role not found");
        }
        return await roleRepository.delete(roleToDelete);
    }
}

export const roleService = new RoleService();