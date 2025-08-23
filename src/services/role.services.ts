import { In } from "typeorm";
import { RoleDto } from "../dto/role.dto";
import { permissionRepository } from "../repositories/permission.repository";
import { roleRepository } from "../repositories/role.repository";
import { Role } from "../entities/Role";
import {BadRequestException, NotFoundException} from "../exceptions/exceptions";


class RoleService {
    public async findAll(page: number, limit: number) {
        const [roles , total] = await roleRepository.findAndCount({
            relations: ["permissions"],
            skip: (page - 1) * limit,
            take: limit,
            order: {id: "desc"}
        });

        return {
            total: total,
            results: roles,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        }
    }

    public async findOne(id: number) {
        const roles = await roleRepository.findOne({
            where: {id:id},
            relations: ["permissions"],
        });

        if (!roles) {
            throw new NotFoundException("Role not found");
        }

        return roles;
    }

    public async create(role: RoleDto): Promise<any> {
        const permissions= await permissionRepository.findBy({
            id: In(role.permissions)
        });

        if (permissions.length !== role.permissions.length) {
            throw new BadRequestException("Some permission not found");
        }

        const roles = roleRepository.create({
            name: role.name,
            permissions: permissions,
        })

        return await roleRepository.save(roles);
    }

    public async update(id: number, role: RoleDto) {
        const permissions= await permissionRepository.findBy({
            id: In(role.permissions)
        });

        if (permissions.length !== role.permissions.length) {
            throw new BadRequestException("Some permissions not found");
        }

        const roleToUpdate = await roleRepository.findOneBy({ id });

        if (!roleToUpdate) {
            throw new NotFoundException("Role not found");
        }
        roleToUpdate.name = role.name;
        roleToUpdate.permissions = permissions;
        return await roleRepository.save(roleToUpdate);
    }

    public async remove(id: number) {
        const roleToDelete = await roleRepository.findOneBy({ id });

        if (!roleToDelete) {
            throw new NotFoundException("Role not found");
        }

        return await roleRepository.delete(roleToDelete);
    }
}

export const roleService = new RoleService();