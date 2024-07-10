import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested } from "class-validator";
import { CateNews } from "./create-catenews.dto";
import { NewsUserDto } from './create-newuser.dto';
export class CreateNewsDto {
    

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string;

    @IsString()
    @MaxLength(5000)
    @IsNotEmpty()
    content: string;

    @IsArray()
    @ValidateNested({each: true })
    @Type(()=>CateNews)
    categories: CateNews[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => NewsUserDto)
    users: NewsUserDto[];
}
