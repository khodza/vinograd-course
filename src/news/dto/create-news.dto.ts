import { IsString } from "class-validator"

export class CreateNewsDto {

    @IsString()
    headerRus:string;

    @IsString()
    headerUzb:string;

    @IsString()
    content1rus:string;

    @IsString()
    content2rus:string;

    @IsString()
    content1uzb:string;

    @IsString()
    content2uzb:string;
}
