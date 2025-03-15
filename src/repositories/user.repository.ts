import { AppDataSource } from "../config/database";
import { User } from "../entities/User";

export  const userRepository = AppDataSource.getRepository(User);
