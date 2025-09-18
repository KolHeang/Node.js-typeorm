import {EmployeeService} from "../services/employee.services";
import {Request, Response} from "express";
import {responseController} from "../utils/response.util";
import {ValidatorDTO} from "../decorators/ValidatorDTO";
import {CreateEmployeeDto} from "../dto/create-employee.dto";
import {UpdateEmployeeDto} from "../dto/update-employee.dto";

export class EmployeeControllers {
    private employeeService = new EmployeeService();

    @ValidatorDTO(CreateEmployeeDto)
    public async create(req: Request, res: Response) {
        try {
            const data : CreateEmployeeDto = req.body;
            const result = await this.employeeService.create(data);
            return responseController(res, 200, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message||"Internal Server Error");
        }
    }

    public async findAll(req: Request, res: Response) {
        try {
            const page = parseInt(req.params.page) || 1;
            const limit = parseInt(req.params.limit) || 10;
            const result = await this.employeeService.findAll(page, limit);
            return responseController(res, 200, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message||"Internal Server Error");
        }
    }

    public async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const employee = await this.employeeService.findOne(id);
            return responseController(res, 200, true, "Successful", employee);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message||"Internal Server Error");
        }
    }

    @ValidatorDTO(UpdateEmployeeDto)
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const data : UpdateEmployeeDto = req.body;
            const result = await this.employeeService.update(id, data);
            return responseController(res, 200, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message||"Internal Server Error");
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const employee = await this.employeeService.remove(id);
            return responseController(res, 200, true, "Successful", employee);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message||"Internal Server Error");
        }
    }
}
export const employeeController = new EmployeeControllers();