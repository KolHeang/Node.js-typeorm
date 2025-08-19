import express from "express";
import { roleController } from "../controllers/role.controllers";

const route= express.Router();

route.get("/roles", roleController.getAllRoles);
route.get("/roles/:id", roleController.getRoleById as any);
route.post("/roles", roleController.createRole);
route.put("/roles/:id", roleController.updateRole as any);
route.delete("/roles/:id", roleController.deleteRole as any);

export { route as roleRoutes };