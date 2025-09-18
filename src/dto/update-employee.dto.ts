import {IsBoolean, IsDateString, IsEmail, IsEnum, IsOptional, IsString, Length} from "class-validator";
export class UpdateEmployeeDto {
    @IsOptional()
    @IsString()
    full_name_en?: string;

    @IsOptional()
    @IsString()
    full_name_kh?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(["M", "F"])
    gender?: "M" | "F";

    @IsOptional()
    @IsDateString()
    date_of_birth?: Date;

    @IsOptional()
    @IsString()
    @Length(8, 20)
    phone_number?: string;

    @IsOptional()
    department_id?: number;

    @IsOptional()
    position_id?: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    start_work?: Date;
}