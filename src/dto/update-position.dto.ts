import {IsNotEmpty, IsString} from "class-validator";
import {IsUnique} from "../decorators/IsUnique";
import {Position} from "../entities/Position";

export class UpdatePositionDto {
    @IsNotEmpty()
    @IsString()
    nameEn: string;

    @IsNotEmpty()
    @IsString()
    nameKh: string;
}