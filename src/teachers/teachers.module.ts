import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teachers.model';
@Module({
  imports:[MongooseModule.forFeature([{name:'Teacher',schema:TeacherSchema}])],
  controllers: [TeachersController],
  providers: [TeachersService]
})
export class TeachersModule {}
