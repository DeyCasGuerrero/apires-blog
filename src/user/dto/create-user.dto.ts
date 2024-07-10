import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @Transform(({value})=>value.trim())
    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
