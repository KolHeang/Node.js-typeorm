import {IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @IsOptional()
    employee_code?: string;

    @IsString()
    @IsNotEmpty()
    full_name_en: string;

    @IsString()
    @IsNotEmpty()
    full_name_kh: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsEnum(["M", "F"])
    gender: "M" | "F";

    @IsDateString()
    @IsOptional()
    date_of_birth?: Date;

    @IsString()
    @IsOptional()
    @Length(8, 20)
    phone_number?: string;

    @IsOptional()
    department_id?: number;

    @IsOptional()
    position_id?: number;

    @IsOptional()
    start_work?: Date;
}