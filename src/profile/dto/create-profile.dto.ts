import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @MinLength(10)
    @MaxLength(20)
    @IsEmail()
    userEmail: string;

    @Transform(({value})=> value.trim())
    @IsString()
    @MaxLength(150)
    description: string;

    @Transform(({value})=> value.trim())
    @IsString()
    urlImg: string;

}
