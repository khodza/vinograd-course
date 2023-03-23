import { BadRequestException, Injectable,HttpException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Teacher } from './teachers.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import mongoose, { Model } from 'mongoose';
import * as fs from 'fs'
import * as path from 'path';
@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name) private readonly teacherModel: Model<Teacher>,
  ) {}
  async create(createTeacherDto: CreateTeacherDto,fileName:string): Promise<Teacher> {
    try {
      const teacher  ={...createTeacherDto,photo:fileName}
      const newTeacher = await this.teacherModel.create(teacher);
      return newTeacher;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }
  async findAll():Promise<Teacher[]> {
    try {
      const teacher = await this.teacherModel.find();
      return teacher;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string):Promise<Teacher> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException('Provide valid ID')
      }
      const teacher = await this.teacherModel.findById(id);
      if (!teacher) {
        throw new BadRequestException(`No teacher with this ID : ${id}`);
      }
      return teacher;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto,photoName?:string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException('Provide valid ID')
      }
      let updateOpt:object;
      if(photoName){
         const fileName = (await this.teacherModel.findById(id).select('photo')).photo
         const filePath  = path.join(__dirname,'../..','uploads','teachers',fileName)
         await fs.promises.unlink(filePath);
         updateOpt ={...updateTeacherDto,photo:photoName}
      }else{
        updateOpt ={...updateTeacherDto}
      }
      await this.teacherModel.updateOne({_id:id}, updateOpt,{runValidators:true});
      const teacher =await this.findOne(id)
      if (!teacher) {
        throw new BadRequestException(`No teacher with this id ${id}`);
      }
      return teacher;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async remove(id: string):Promise<{message:string}> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Provide valid ID: ${id}`);
      }
      const teacher = (await this.teacherModel.findById(id).select('photo'))
      if(!teacher){
        throw new BadRequestException(`No teacher photo with this ID : ${id}`)
      }
      const fileName = teacher.photo
      const filePath  = path.join(__dirname,'../..','uploads','teachers',fileName)
      await fs.promises.unlink(filePath);
      const deletedTeacher = await this.teacherModel.findByIdAndDelete(id);
      if (!deletedTeacher) {
        throw new BadRequestException(`No teacher with this ID : ${id}`);
      }
      return { message: `Teacher with ID ${id} has been deleted` };
    } catch (err) {
      throw new BadRequestException(err.message, err);
    }
  }

    //PHOTO
    async getPhotoPreview(name: string,res:any): Promise<void> {
      const filePath = path.join(__dirname, '../../uploads/teachers', `${name}`);
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
