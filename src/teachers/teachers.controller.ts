import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UseGuards, Query, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MulterOptions } from 'src/multerOptions/photo-single-upload.interceptor';
import { Response } from 'express';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  //CREATE TEACHER
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo',new MulterOptions('teachers').multerOptions))
  create(@Body() createTeachersDto: CreateTeacherDto,@UploadedFile() photo: Express.Multer.File) {
    return this.teachersService.create(createTeachersDto,photo?.filename)
  } 

  //GET ALL TEACHERS
  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

 //GET IMAGE BY NAME
 @Get('photo')
 async getPhotoPreview(@Query('name') name: string, @Res() res: Response) {
   await this.teachersService.getPhotoPreview(name,res);
 }

  //GET TEACHER BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  //UPDATE TEACHER
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo',new MulterOptions('teachers').multerOptions))
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
