import { IsString } from "class-validator";

export class CreateTextDto {
    @IsString()
    aboutUs:string;

    @IsString()
    titleAboutUs:string;

    @IsString()
    contentAboutUs:string;

    
}
