import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname,join } from 'path';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MulterOptions } from './interceptors/photo-upload.interceptor';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  //CREATE COURSE
  @Post()
  @UseInterceptors(FileInterceptor('photo',new MulterOptions()))
  create(@UploadedFile() photo: Express.Multer.File,@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto,photo.filename)
  } 

  //GET ALL COURSES
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }


  //GET COURSE BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  //UPDATE COURSE
  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo',new MulterOptions()))
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto,@UploadedFile() photo:Express.Multer.File) {
    return this.coursesService.update(id, updateCourseDto,photo.filename);
  }

  //DELETE COURSE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
