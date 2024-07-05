import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateProfileDto {
    @IsString()
    @MinLength(10)
    @MaxLength(20)
    userEmail: string;

    @IsString()
    @MaxLength(150)
    description: string;

}
