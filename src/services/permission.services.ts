import { PermissionDto } from "../dto/permission.dto";
import { NotFoundException } from "../exceptions/exceptions";
import { permissionRepository } from "../repositories/permission.repository";
export class PermissionServices {
    private permissionRepository = permissionRepository;

    public async find(page: number, limit: number) {
        const [permissions, total] = await this.permissionRepository.findAndCount({
            skip: (page - 1) * limit, 
            take: limit,              
            order: { id: 'DESC' },     
        });

        return {
            result: permissions,
            total,
            curentPage:page,
            totalPages: Math.ceil(total / limit),
        };
    }

    public async create(permissionDto: PermissionDto) {
        const permission = this.permissionRepository.create({
            name: permissionDto.name,
            slug: permissionDto.slug
        });

        return await this.permissionRepository.save(permission);
    }

    public async findOne(id: number) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        
        if (!permission) {
            throw new NotFoundException("Permission not found");
        }

        return permission;
    }

    public async update(id: number, permissionDto: PermissionDto) {
        const permission = await this.permissionRepository.findOne({ where: { id } });
        
        if (!permission) {
            throw new NotFoundException("Permission not found");
        }

        permission.name = permissionDto.name ?? permission.name;
        permission.slug = permissionDto.slug ?? permission.slug;

        await this.permissionRepository.save(permission);

        return permission;
    }

    public async remove(id: number) {
        const permission = await this.permissionRepository.findOne({ where: { id } });

        if (!permission) {
            throw new NotFoundException("Permission not found");
        }

        await this.permissionRepository.remove(permission);
    }
}