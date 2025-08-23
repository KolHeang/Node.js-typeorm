import {PositionService} from "../services/position.services";
import {Request, Response} from "express";
import {positionRepository} from "../repositories/position.repository";
import {CreatePositionDto} from "../dto/create-position.dto";
import {responseController} from "../utils/response.util";
import {UpdatePositionDto} from "../dto/update-position.dto";
import {ValidatorDTO} from "../decorators/ValidatorDTO";

export class PositonControllers {
    private positionService = new PositionService();

    @ValidatorDTO(CreatePositionDto)
    public async create(req: Request, res: Response) {
        try {
            const positionDto: CreatePositionDto = req.body;
            const result = await this.positionService.create(positionDto);
            return responseController(res, 201, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message|| "Internal Server Error");
        }
    }

    public async findAll(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const page = parseInt(req.query.page as string) || 1;
            const result = await this.positionService.findAll(page, limit);
            return responseController(res, 201, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message|| "Internal Server Error");
        }
    }

    public async findOne(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.positionService.findOne(id);
            return responseController(res, 201, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message|| "Internal Server Error");
        }
    }

    @ValidatorDTO(UpdatePositionDto)
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const positionDto: UpdatePositionDto = req.body;
            const result = await this.positionService.update(id, positionDto);
            return responseController(res, 201, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message|| "Internal Server Error");
        }
    }

    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const result = await this.positionService.remove(id);
            return responseController(res, 201, true, "Successful", result);
        } catch (error) {
            return responseController(res, error.code||500, false, error.message|| "Internal Server Error");
        }
    }
}

export const positionController = new PositonControllers();