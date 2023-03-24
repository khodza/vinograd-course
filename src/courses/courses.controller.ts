import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, BadRequestException, UseGuards, Res, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname,join } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { MulterOptions } from '../multerOptions/photo-single-upload.interceptor';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dot';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService,private readonly categoryService:CategoriesService) {}

    //CATEGORIES

  //CREATE CATEGORY
  @UseGuards(JwtAuthGuard)
  @Post('categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  //GET ALL CATEGORIES
  @Get('categories')
  findAllCategories(){
    return this.categoryService.findAll()
  }

  //GET CATEGORY BY ID
  @Get('categories/:id')
  findOneCategory(@Param('id') id){
    return this.categoryService.findOne(id)
  }

  //UPDATE CATEGORY
  @Patch('categories/:id')
  @UseGuards(JwtAuthGuard)
  updateCATEGORY(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  //DELETE CATEGORY
  @UseGuards(JwtAuthGuard)
  @Delete('/categories/:id')
  deleteCategory(@Param('id') id:string){
    return this.categoryService.remove(id)
  }


  //COURSES

  //CREATE COURSE
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('photo',new MulterOptions('courses').multerOptions))
  create(@Body() createCourseDto: CreateCourseDto,@UploadedFile() photo: Express.Multer.File) {
    return this.coursesService.create(createCourseDto,photo?.filename)
  } 

  //GET ALL COURSES
  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  //GET IMAGE BY NAME
  @Get('photo')
  async getPhotoPreview(@Query('name') name: string, @Res() res: Response) {
   await this.coursesService.getPhotoPreview(name,res);
  }

  //GET COURSE BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  //UPDATE COURSE
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo',new MulterOptions('courses').multerOptions))
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto,@UploadedFile() photo:Express.Multer.File) {
    return this.coursesService.update(id, updateCourseDto,photo?.filename);
  }

  //DELETE COURSE
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
