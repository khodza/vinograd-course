import { BadRequestException, Injectable, NotFoundException,HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.model';
import mongoose, { Model } from 'mongoose';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private readonly newsModel:Model<News>){}
  async create(createNewsDto: CreateNewsDto,photos:Array<Express.Multer.File>) {
    try{
      const newPhotos = {};
      Object.keys(photos).forEach((key) => {
      newPhotos[key] = photos[key][0].filename;
      })
      const newNews ={...createNewsDto,...newPhotos}
      const createdNews = await this.newsModel.create(newNews)
      return createdNews;
    }catch(err){
      throw new BadRequestException(err.message, err);
    }
}

async findAll():Promise<News[]> {
  try {
    const news = await this.newsModel.find();
    return news;
  } catch (err) {
    throw new BadRequestException(err);
  }
}

  async update(id: string, updateNewsDto: UpdateNewsDto,photos?:Array<Express.Multer.File>) {
    try{
      if (!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException('Provide valid ID')
      }
      const newPhotos = {};
      Object.keys(photos).forEach((key) => {
      newPhotos[key] = photos[key][0].filename;
      })
      const newNews ={...updateNewsDto,...newPhotos}
      const updatedNews = await this.newsModel.findByIdAndUpdate(id,newNews)
      if(!updatedNews){
        throw new BadRequestException('No news with given ID')
      }
      return updatedNews;
    }catch(err){
      throw new BadRequestException(err.message, err);
    }
  }

  async getPhotoPreview(name: string,res:any): Promise<void> {
    const filePath = path.join(__dirname, '../../uploads/news', `${name}`);
    if (!fs.existsSync(filePath)) {
      throw new HttpException('File not found', 404);
    }

    const stream = fs.createReadStream(filePath);
    stream.on('error', (error) => {
      throw new HttpException('Internal server error', 500);
    });

    res.set('Content-Type', 'image/jpeg');
    res.on('close', () => {
      stream.destroy();
    });

    stream.pipe(res);
  }
}
