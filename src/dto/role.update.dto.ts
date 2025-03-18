import { IsNumber, IsString } from "class-validator";

export class RoleDtoUpdate {
    @IsString()
    name: string;
    permissions: string[];
}