import { Controller, Get, Post, Body, Patch, Param, UseInterceptors, UploadedFiles, UseGuards, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { MulterOptions } from '../multerOptions/photo-upload.interceptor';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  //CREATE NEWS
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{name:'photo1',maxCount:1},{name:'photo2',maxCount:1},{name:'photo3',maxCount:1},{name:'photo4',maxCount:1}],new MulterOptions('news').multerOptions))
  create(@Body() createNewsDto: CreateNewsDto,@UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.newsService.create(createNewsDto,photos);
  }
  
  //GET ALL(ONE) NEWS
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  //UPDATE NEWS
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileFieldsInterceptor([{name:'photo1',maxCount:1},{name:'photo2',maxCount:1},{name:'photo3',maxCount:1},{name:'photo4',maxCount:1}],new MulterOptions('news').multerOptions))
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto,@UploadedFiles() photos: Array<Express.Multer.File>) {
    return this.newsService.update(id, updateNewsDto,photos);
  }

  //GET IMAGE BY NAME
  @Get('photo')
  async getPhotoPreview(@Query('name') name: string, @Res() res: Response) {
    await this.newsService.getPhotoPreview(name,res);
  }
}
