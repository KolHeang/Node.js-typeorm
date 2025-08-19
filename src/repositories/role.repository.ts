import { AppDataSource } from "../config/database";
import { Role } from "../entities/Role";

export const roleRepository = AppDataSource.getRepository(Role);