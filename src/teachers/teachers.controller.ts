import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { MulterOptions } from './interceptors/photo-upload.interceptor';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  //CREATE TEACHER
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo',new MulterOptions()))
  create(@Body() createTeachersDto: CreateTeacherDto,@UploadedFile() photo: Express.Multer.File) {
    return this.teachersService.create(createTeachersDto,photo?.filename)
  } 

  //GET ALL TEACHERS
  @Get()
  findAll() {
    return this.teachersService.findAll();
  }


  //GET TEACHER BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  //UPDATE TEACHER
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo',new MulterOptions()))
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto,@UploadedFile() photo:Express.Multer.File) {
    return this.teachersService.update(id, updateTeacherDto,photo?.filename);
  }

  //DELETE TEACHER
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
