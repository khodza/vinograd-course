import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './news.model';

@Module({
  imports:[MongooseModule.forFeature([{name:'News',schema:NewsSchema}])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
