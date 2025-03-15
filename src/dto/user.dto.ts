import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
export class UserDto {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
    @IsInt()
    @IsNotEmpty()
    rolesId: number;
}