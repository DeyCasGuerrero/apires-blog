import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @IsInt()
    @IsNotEmpty()
    idCategory: number;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;
}
