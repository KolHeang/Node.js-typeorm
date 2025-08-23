import {IsNotEmpty, IsString} from "class-validator";
import {IsUnique} from "../decorators/IsUnique";
import {Department} from "../entities/Department";

export class UpdateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    nameEn: string;

    @IsNotEmpty()
    @IsString()
    nameKh: string;
}