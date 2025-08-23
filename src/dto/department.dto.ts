import {IsNotEmpty, IsString} from "class-validator";
import {IsUnique} from "../decorators/IsUnique";
import {Department} from "../entities/Department";

export class DepartmentDto {
    id?: number;

    @IsNotEmpty()
    @IsString()
    @IsUnique(Department,"nameEn")
    nameEn: string;

    @IsNotEmpty()
    @IsString()
    @IsUnique(Department,"nameKh")
    nameKh: string;
}