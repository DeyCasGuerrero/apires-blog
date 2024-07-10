import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @Transform(({value})=> value.trim())
    @IsNotEmpty()
    @IsString()
    name:string;

    @Transform(({value})=> value.trim())
    @IsNotEmpty()
    @IsString()
    country:string;
    
    @Transform(({value})=> value.trim())
    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password:string;
}