import { Transform, Type } from 'class-transformer';
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
    @Transform(({value})=> value.trim())
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    title: string;

    @Transform(({value})=> value.trim())
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
