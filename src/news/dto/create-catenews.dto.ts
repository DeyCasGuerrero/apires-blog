import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class CateNews{

    @IsInt()
    @IsNotEmpty()
    idCateNews:number;

    @IsString()
    @IsNotEmpty()
    category:string;
}