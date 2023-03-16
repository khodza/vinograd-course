import { Transform } from "class-transformer";
import { IsString, IsNumber, isString } from "class-validator";

export class CreateCourseDto {
  @IsString()
  name_rus: string;

  @IsString()
  name_uzb: string;

  @IsString()
  content_rus: string;

  @IsString()
  content_uzb: string;

  @IsString()
  startDate:string;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  price: number;

  @IsString()
  categories:String;
}