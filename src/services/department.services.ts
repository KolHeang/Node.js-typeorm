import {DepartmentDto} from "../dto/department.dto";
import {departmentRepository} from "../repositories/department.repository";
import {NotFoundException} from "../exceptions/exceptions";

export class DepartmentService {
    public async create(data: DepartmentDto) {
        const department = departmentRepository.create({
            nameEn: data.nameEn,
            nameKh: data.nameKh,
        });
        return await departmentRepository.save(department);
    }

    public  async findAll(page: number, limit: number) {
        const [departments, total] = await departmentRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { id: "desc"}
        });

        return {
            total: total,
            results: departments,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        }
    }

    public async findOne(departmentId: number) {
        const department = await departmentRepository.findOne({
            where: { id: departmentId },
        });
        if (!department) {
            throw new NotFoundException("Department not found");
        }

        return department;
    }

    public async update(departmentId: number,data: DepartmentDto) {
        const department = await departmentRepository.findOne({
            where: { id: departmentId }
        });
        if (!department) {
            throw new NotFoundException("Department not found");
        }

        department.nameEn = data.nameEn ?? department.nameEn;
        department.nameKh = data.nameKh ?? department.nameEn;
        return await departmentRepository.save(department);
    }

    public async delete(departmentId: number) {
        const department = await departmentRepository.findOne({
            where: { id: departmentId },
        });
        if (!department) {
            throw new NotFoundException("Department not found");
        }
        return await departmentRepository.delete(departmentId);
    }
}