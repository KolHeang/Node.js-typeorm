import { AppDataSource } from "../config/database";
import {Permission} from "../entities/Permission";
export const permissionRepository = AppDataSource.getRepository(Permission);