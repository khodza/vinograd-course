import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './course.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstance } from 'src/auth/constants/jwt-constants';
import { CategoriesSchema } from './categories.model';
import { CategoriesService } from './categories.service';
@Module({
  imports:[MongooseModule.forFeature([{name:'Course',schema:CourseSchema}]),MongooseModule.forFeature([{name:'Categories',schema:CategoriesSchema}]),JwtModule.registerAsync(jwtConstance)],
  controllers: [CoursesController],
  providers: [CoursesService,CategoriesService]
})
export class CoursesModule {}
