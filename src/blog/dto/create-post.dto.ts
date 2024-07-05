import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsEmail,
    IsNotEmpty,
    IsObject,
    IsString,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';

import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class CreatePost {
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    title: string;

    @IsString()
    @MaxLength(5000)
    @IsNotEmpty()
    content: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCategoryDto)
    categories: CreateCategoryDto[];


    @IsString()
    @IsEmail()
    @IsNotEmpty()
    authorEmail: string;
    
}
