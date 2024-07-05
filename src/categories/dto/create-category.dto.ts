import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;
}
