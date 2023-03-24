import { IsString } from "class-validator";

export class CreateCategoryDto{
    @IsString()
    name_uzb:string;

    @IsString()
    name_rus:string;
}