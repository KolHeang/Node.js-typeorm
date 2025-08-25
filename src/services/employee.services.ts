import { employeeRepository } from "../repositories/employee.repository";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {NotFoundException} from "../exceptions/exceptions";
import {UpdateEmployeeDto} from "../dto/update-employee.dto";
import {departmentRepository} from "../repositories/department.repository";
import {positionRepository} from "../repositories/position.repository";

export class EmployeeService {
    public async create(data: CreateEmployeeDto) {
        // Get Department
        const department = await departmentRepository.findOne({ where: { id: data.department_id } });
        if (!department) throw new NotFoundException("Department not found");

        // Get Position
        const position = await positionRepository.findOne({ where: { id: data.position_id } });
        if (!position) throw new NotFoundException("Position not found");

        // Generate employee_code
        const count = await employeeRepository.count();
        const empCode = `CE-${String(count + 1).padStart(5,"0")}`;
        // Create Employee
        const employee = employeeRepository.create({
            employee_code: data.employee_code ? data.employee_code : empCode,
            full_name_en: data.full_name_en,
            full_name_kh: data.full_name_kh,
            email: data.email,
            phone_number: data.phone_number,
            gender: data.gender,
            date_of_birth: data.date_of_birth,
            start_work: data.start_work,
            department,
            position,
        });

        return await employeeRepository.save(employee);
    }

    public async findAll(page: number, limit: number) {
        const [employees, total] = await employeeRepository.findAndCount({
            relations: ['department','position'],
            skip: (page - 1) * limit,
            take: limit,
            order: {id: "DESC"},
        });

        return {
            total,
            results: employees,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        }
    }

    public async findOne(id: number) {
        const employee = await employeeRepository.findOne({
            where: { id: id },
            relations: ['department','position'],
        });

        if (!employee) {
            throw new NotFoundException("Employee not found");
        }

        return employee;
    }

    public async update(id: number, data: UpdateEmployeeDto) {
        const employee = await employeeRepository.findOne({
            where: { id: id },
        });

        if (!employee) {
            throw new NotFoundException("Employee not found");
        }

        employee.full_name_en = data.full_name_en ?? employee.full_name_en;
        employee.full_name_kh = data.full_name_kh ?? employee.full_name_kh;
        employee.email = data.email ?? employee.email;
        employee.phone_number = data.phone_number ?? employee.phone_number;
        employee.gender = data.gender ?? employee.gender;
        employee.date_of_birth = data.date_of_birth ?? employee.date_of_birth;
        employee.is_active = data.is_active ?? employee.is_active;
        employee.start_work = data.start_work ?? employee.start_work;

        // Handle Department relation
        if (data.department_id) {
            const department = await departmentRepository.findOne({ where: { id: data.department_id } });
            if (!department) throw new NotFoundException("Department not found");
            employee.department = department;
        }

        // Handle Position relation
        if (data.position_id) {
            const position = await positionRepository.findOne({ where: { id: data.position_id } });
            if (!position) throw new NotFoundException("Position not found");
            employee.position = position;
        }

        return await employeeRepository.save(employee);
    }

    public async remove(id: number) {
        const employee = await employeeRepository.findOne({
            where: { id: id },
        });

        if (!employee) {
            throw new NotFoundException("Employee not found");
        }

        return await employeeRepository.remove(employee);
    }
}