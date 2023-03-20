import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from './news.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstance } from 'src/auth/constants/jwt-constants';

@Module({
  imports:[MongooseModule.forFeature([{name:'News',schema:NewsSchema}]),JwtModule.registerAsync(jwtConstance)],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
