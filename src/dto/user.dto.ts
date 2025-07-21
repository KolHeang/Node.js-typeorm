import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsUnique } from "../decorators/IsUnique";
import { User } from "../entities/User";
export class UserDto {
    @IsString()
    @IsUnique(User, "username")
    username: string;

    @IsEmail()
    @IsUnique(User, "email")
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    
    rolesId?: number;

    twoFactorSecret?: string;

    isTwoFactorEnabled?: boolean;
}