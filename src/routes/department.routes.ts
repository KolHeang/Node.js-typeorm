import express from 'express';
import {departmentController} from "../controllers/department.controllers";

const router = express.Router();
router.post("/department", departmentController.create);
router.get("/department", departmentController.findAll);
router.get("/department/:departmentId", departmentController.findOne);
router.put("/department/:departmentId", departmentController.update);
router.delete("/department/:departmentId", departmentController.delete);

export { router as departmentRouter };