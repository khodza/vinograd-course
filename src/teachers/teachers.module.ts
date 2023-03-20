import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teachers.model';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstance } from 'src/auth/constants/jwt-constants';
@Module({
  imports:[MongooseModule.forFeature([{name:'Teacher',schema:TeacherSchema}]),JwtModule.registerAsync(jwtConstance)],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
