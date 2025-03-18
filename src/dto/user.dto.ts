import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { IsUnique } from "../decorators/IsUnique";
import { User } from "../entities/User";
export class UserDto {
    @IsString()
    @IsNotEmpty()
    @IsUnique(User, "username")
    username: string;
    @IsEmail()
    @IsNotEmpty()
    @IsUnique(User, "email")
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    @IsInt()
    @IsNotEmpty()
    rolesId: number;
}