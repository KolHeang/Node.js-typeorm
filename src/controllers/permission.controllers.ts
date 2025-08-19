import { Request, Response } from "express";
import { PermissionServices } from "../services/permission.services";
import { responseController } from "../utils/response.util";

export class PermissionControllers {
    private permissionServices = new PermissionServices();

    public async getAll (req: Request, res: Response)  {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const result = await this.permissionServices.find(page, limit)
            return responseController(res, 200, true, 'Successfully',result);
        } catch (error) {
            return responseController(res, error.code, false, error.message )
        }
    };

    public async getOne  (req: Request, res: Response)  {
        try {
            const id = parseInt(req.params.id);
            const permission = await this.permissionServices.findOne(id);
            return responseController(res, 200, true, 'Successfully',permission);
        } catch (error) {
            return responseController(res, error.code, false, error.message )
        }
    };

    public async create  (req: Request, res: Response) {
        try {
            const permission = await this.permissionServices.create(req.body);
            return responseController(res, 200, true, 'Successfully',permission);
        } catch (error) {
            return responseController(res, error.code, false, error.message )
        }
    };

    public async update (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatedPermission = await this.permissionServices.update(id, req.body);
            return responseController(res, 200, true, 'Successfully',updatedPermission);
        } catch (error) {
            return responseController(res, error.code, false, error.message )
        }
    };

    public async remove (req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.permissionServices.remove(id);
            return responseController(res, 200, true, 'Successfully',result);
        } catch (error) {
            return responseController(res, error.code, false, error.message )
        }
    };
}

export const permissionControllers = new PermissionControllers();
