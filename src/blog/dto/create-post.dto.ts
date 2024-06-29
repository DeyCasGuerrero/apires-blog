import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsDate,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreatePost {
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    title: string;

    @IsString()
    @MaxLength(5000)
    content: string;

    // @IsArray()
    // @ArrayNotEmpty()
    // @ArrayMinSize(1)
    // @ArrayMaxSize(5)
    // categories: String[];
    
}
