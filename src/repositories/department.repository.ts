import { AppDataSource } from "../config/database";
import { Department } from "../entities/Department";

export const departmentRespository = AppDataSource.getRepository(Department);