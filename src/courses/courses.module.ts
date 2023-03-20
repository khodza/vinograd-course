import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './course.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstance } from 'src/auth/constants/jwt-constants';
@Module({
  imports:[MongooseModule.forFeature([{name:'Course',schema:CourseSchema}]),JwtModule.registerAsync(jwtConstance)],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
