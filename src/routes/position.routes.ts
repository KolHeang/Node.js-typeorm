import express from "express";
import {positionController} from "../controllers/positon.controllers";

const router = express.Router();

router.post("/position", positionController.create);
router.get("/position", positionController.findAll);
router.get("/positions/:id", positionController.findOne);
router.put("/positions/:id", positionController.update);
router.delete("/positions/:id", positionController.remove);

export {router as positionRouter};