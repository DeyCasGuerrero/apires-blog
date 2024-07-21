import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email:string;
    
    @Transform(({value})=> value.trim())
    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password:string;
}