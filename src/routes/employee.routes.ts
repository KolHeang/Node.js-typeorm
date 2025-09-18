import express from "express";
import {employeeController} from "../controllers/employee.controllers";

const router = express.Router();

router.post("/employee", employeeController.create);
router.get("/employee", employeeController.findAll);
router.get("/employee/:id", employeeController.findOne);
router.put("/employee/:id", employeeController.update);
router.delete("/employee/:id", employeeController.remove);

export { router as employeeRouter };