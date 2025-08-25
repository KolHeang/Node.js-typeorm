import { AppDataSource } from "../config/database";
import { Department } from "../entities/Department";

export const departmentRepository = AppDataSource.getRepository(Department);