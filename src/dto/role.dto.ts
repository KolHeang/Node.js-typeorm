import { IsNumber, IsString } from "class-validator";
import { IsUnique } from "../decorators/IsUnique";
import { Role } from "../entities/Role";

export class RoleDto {
    @IsString()
    @IsUnique(Role, "name")
    name: string;
    
    permissions: string[];
}