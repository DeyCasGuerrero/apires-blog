import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsDate,
    IsEmail,
    IsObject,
    IsOptional,
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
    title: string;

    @IsString()
    @MaxLength(5000)
    content: string;

    @IsObject()
    @ValidateNested()
    @Type(() => CreateCategoryDto)
    categories: CreateCategoryDto;


    @IsString()
    @IsEmail()
    authorEmail: string;
    
}
