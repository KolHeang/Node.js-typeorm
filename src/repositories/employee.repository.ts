import { AppDataSource} from "../config/database";
import {Employee} from "../entities/Employee";
 export  const employeeRepository = AppDataSource.getRepository(Employee);