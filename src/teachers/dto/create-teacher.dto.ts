import { Transform } from "class-transformer";
import { IsString, IsNumber, isString } from "class-validator";

export class CreateTeacherDto {
  @IsString()
  name: string;
}