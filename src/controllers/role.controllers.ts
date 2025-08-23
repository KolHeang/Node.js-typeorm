import { ValidatorDTO } from "../decorators/ValidatorDTO";
import { RoleDto } from "../dto/role.dto";
import { roleService } from "../services/role.services";
import { Request, Response } from "express";
import { RoleDtoUpdate } from "../dto/role.update.dto";
import {responseController} from "../utils/response.util";

class RoleController {
    public async findAll(req: Request, res: Response) {
        try{
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const roles = await roleService.findAll(page, limit);
            return responseController(res, 200, true, "Successful", roles);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message || "Internal Server Error");
        }
    }

    public async findOne(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const role = await roleService.findOne(id);
            return responseController(res, 200, true, "Successful", role);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message || "Internal Server Error");
        }
    }

    @ValidatorDTO(RoleDto)
    public async create(req: Request, res: Response) {
        try{
            const role: RoleDto = req.body;
            const newRole = await roleService.create(role);
            return responseController(res, 200, true, "Successful", newRole);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message || "Internal Server Error");
        }
    }

    @ValidatorDTO(RoleDtoUpdate)
    public async update(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const role: RoleDto = req.body;
            const updatedRole = await roleService.update(id, role);
           return responseController(res, 200, true, "Successful", updatedRole);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message || "Internal Server Error");
        }
    }

    public async remove(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const deletedRole = await roleService.remove(id);
            return responseController(res, 200, true, "Successful", deletedRole);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message || "Internal Server Error");
        }
    }
}
export const roleController = new RoleController();