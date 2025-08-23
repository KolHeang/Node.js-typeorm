import {AppDataSource} from "../config/database";
import {Position} from "../entities/Position";

export const positionRepository = AppDataSource.getRepository(Position);