import { AppDataSource } from "../config/database";
import  { Attendance } from "../entities/Attendance"

export const attendanceRepository = AppDataSource.getRepository(Attendance)