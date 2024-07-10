import { IsEmail, IsNotEmpty } from "class-validator";

export class NewsUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}