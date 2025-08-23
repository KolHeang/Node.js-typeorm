import {Request, Response} from "express";
import {BaseController} from "./base.controllers";
import {ValidatorDTO} from "../decorators/ValidatorDTO";
import {DepartmentDto} from "../dto/department.dto";
import {responseController} from "../utils/response.util";
import {DepartmentService} from "../services/department.services";
import {UpdateDepartmentDto} from "../dto/update-department.dto";

export class DepartmentControllers extends BaseController{
    private departmentService = new DepartmentService();
    @ValidatorDTO(DepartmentDto)
    public async create(req:Request, res:Response){
        try {
            const department: DepartmentDto = req.body;
            const result = await this.departmentService.create(department);
            return responseController(res,200,true,"Successful",result);
        } catch (error) {
            return responseController(res,error.code||500,false, error.message||"Internal Server Error");
        }
    }

    public async findAll(req:Request, res:Response){
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await this.departmentService.findAll(page, limit);
            return responseController(res,200,true,"Successful",result);
        } catch (error) {
            return responseController(res,error.code||500,false, error.message||"Internal Server Error");
        }
    }

    public async findOne(req:Request, res:Response){
        try {
            const departmentId = parseInt(req.params.departmentId);
            const result = await this.departmentService.findOne(departmentId);
            return responseController(res,200,true,"Successful",result);
        } catch (error) {
            return responseController(res,error.code||500,false, error.message||"Internal Server Error");
        }
    }

    @ValidatorDTO(UpdateDepartmentDto)
    public async update(req:Request, res:Response){
        try {
            const departmentId = parseInt(req.params.departmentId);
            const department: UpdateDepartmentDto = req.body;
            const result = await this.departmentService.update(departmentId, department);
            return responseController(res,200,true,"Successful",result);
        } catch (error) {
            return responseController(res,error.code||500,false, error.message||"Internal Server Error");
        }
    }

    public async delete(req:Request, res:Response){
        try {
            const departmentId = parseInt(req.params.departmentId);
            const result = await this.departmentService.delete(departmentId);
            return responseController(res,200,true,"Successful",result);
        } catch (error) {
            return responseController(res,error.code||500,false, error.message||"Internal Server Error");
        }
    }
}

export const departmentController = new DepartmentControllers();