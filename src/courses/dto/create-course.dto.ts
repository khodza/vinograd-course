import { Transform } from "class-transformer";
import { IsString, IsNumber, IsArray, ArrayNotEmpty, ArrayUnique, IsOptional} from "class-validator";

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

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsOptional()
  categories:String;
}