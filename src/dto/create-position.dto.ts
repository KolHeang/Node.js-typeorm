import {IsNotEmpty, IsString} from "class-validator";
import {IsUnique} from "../decorators/IsUnique";
import {Position} from "../entities/Position";

export class CreatePositionDto {
    @IsNotEmpty()
    @IsString()
    @IsUnique(Position,"nameEn")
    nameEn: string;

    @IsNotEmpty()
    @IsString()
    @IsUnique(Position,"emailKh")
    nameKh: string;
}