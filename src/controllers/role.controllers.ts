import { ValidatorDTO } from "../decorators/ValidatorDTO";
import { RoleDto } from "../dto/role.dto";
import { roleService } from "../services/role.services";
import { Request, Response } from "express";
import { RoleDtoUpdate } from "../dto/role.update.dto";

class RoleController {
    public async getAllRoles(req: Request, res: Response) {
        try{
            const roles = await roleService.getAllRoles();
            res.status(200).json({
                status: true,
                message: "Roles fetched successfully",
                data: roles
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
        
    }
    public async getRoleById(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const role = await roleService.getRoleById(id);
            if (!role) {
                return res.status(404).json({
                    status: false,
                    message: "Role not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Role fetched successfully",
                data: role
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
    @ValidatorDTO(RoleDto)
    public async createRole(req: Request, res: Response) {
        try{
            const role: RoleDto = req.body;
            const newRole = await roleService.createRole(role);
            res.status(201).json({
                status: true,
                message: "Role created successfully",
                data: newRole
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
    @ValidatorDTO(RoleDtoUpdate)
    public async updateRole(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const role: RoleDto = req.body;
            const updatedRole = await roleService.updateRole(id, role);
            if (!updatedRole) {
                return res.status(404).json({
                    status: false,
                    message: "Role not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Role updated successfully",
                data: updatedRole
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
    public async deleteRole(req: Request, res: Response) {
        try{
            const id = parseInt(req.params.id);
            const deletedRole = await roleService.deleteRole(id);
            if (!deletedRole) {
                return res.status(404).json({
                    status: false,
                    message: "Role not found"
                });
            }
            res.status(200).json({
                status: true,
                message: "Role deleted successfully",
                data: deletedRole
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            });
        }
    }
}
export const roleController = new RoleController();