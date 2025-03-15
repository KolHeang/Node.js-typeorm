import { AppDataSource } from "../config/database";
import { User } from "../entities/User.entity";

export const UserRepository = AppDataSource.getRepository(User);
