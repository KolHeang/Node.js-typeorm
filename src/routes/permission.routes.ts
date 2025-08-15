import  express from "express";
import { permissionControllers } from "../controllers/permission.controllers";

const routes = express.Router();

routes.get('/permission',permissionControllers.getAll);
routes.post('/permission',permissionControllers.create);
routes.get('/permission',permissionControllers.getOne);
routes.put('/permission',permissionControllers.update);
routes.delete('/permission',permissionControllers.remove);

export { routes as permissionRoutes }