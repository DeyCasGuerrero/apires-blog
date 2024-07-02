import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {

    @IsNumber()
    id?: number ;

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    name: string;
}
