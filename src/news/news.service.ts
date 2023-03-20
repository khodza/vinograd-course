import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.model';
import mongoose, { Model } from 'mongoose';


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

  async update(id: string, updateNewsDto: UpdateNewsDto,photos:Array<Express.Multer.File>) {
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
      return updatedNews;
    }catch(err){
      throw new BadRequestException(err.message, err);
    }
  }

}
