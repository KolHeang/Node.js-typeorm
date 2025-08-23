import express from "express";
import { roleController } from "../controllers/role.controllers";

const route= express.Router();

route.get("/roles", roleController.findAll);
route.get("/roles/:id", roleController.findOne);
route.post("/roles", roleController.create);
route.put("/roles/:id", roleController.update);
route.delete("/roles/:id", roleController.remove);

export { route as roleRoutes };