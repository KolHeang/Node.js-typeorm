import { IsNotEmpty, IsString } from "class-validator";
import { IsUnique } from "../decorators/IsUnique";
import { Permission } from "../entities/Permission";

export class PermissionDto {
    @IsString()
    @IsNotEmpty()
    @IsUnique(Permission,"name")
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsUnique(Permission,"slug")
    slug: string;
}