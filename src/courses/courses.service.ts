import { BadRequestException, Injectable ,HttpException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from './course.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import mongoose, { Model } from 'mongoose';
import * as fs from 'fs'
import * as path from 'path';
@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name) private readonly courseModel: Model<Course>,
  ) {}
  async create(createCourseDto: CreateCourseDto,fileName:string): Promise<Course> {
    try {
      if(!fileName){
        throw new BadRequestException('Upload course photo');
        }
      const course  ={...createCourseDto,photo:fileName}
      const newCourse = await this.courseModel.create(course);
      return newCourse;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }
  async findAll():Promise<Course[]> {
    try {
      const courses = await this.courseModel.find().populate('categories').exec();;
      return courses;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findOne(id: string):Promise<Course> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException('Provide valid ID')
      }
      const course = await this.courseModel.findById(id);
      if (!course) {
        throw new BadRequestException(`No course with this ID : ${id}`);
      }
      return course;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async update(id: string, updateCourseDto: UpdateCourseDto,photoName?:string) {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)){
        throw new BadRequestException('Provide valid ID')
      }
      let updateOpt:object;
      if(photoName){
         const fileName = (await this.courseModel.findById(id).select('photo')).photo
         const filePath  = path.join(__dirname,'../..','uploads','courses',fileName)
         if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
        }         
         updateOpt ={...updateCourseDto,photo:photoName}
      }else{
        updateOpt ={...updateCourseDto}
      }
      await this.courseModel.updateOne({_id:id}, updateOpt,{runValidators:true});
      const course =await this.findOne(id)
      if (!course) {
        throw new BadRequestException(`No course with this id ${id}`);
      }
      return course;
    } catch (err) {
      throw new BadRequestException(err.message,err);
    }
  }

  async remove(id: string):Promise<{message:string}> {
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException(`Provide valid ID: ${id}`);
      }
      const course = (await this.courseModel.findById(id).select('photo'))
      if(!course){
        throw new BadRequestException(`No course photo with this ID : ${id}`)
      }
      const fileName = course.photo
      const filePath  = path.join(__dirname,'../..','uploads','courses',fileName)
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
      const deletedCourse = await this.courseModel.findByIdAndDelete(id);
      if (!deletedCourse) {
        throw new BadRequestException(`No course with this ID : ${id}`);
      }
      return { message: `Course with ID ${id} has been deleted` };
    } catch (err) {
      throw new BadRequestException(err.message, err);
    }
  }

  //PHOTO
  async getPhotoPreview(name: string,res:any): Promise<void> {
    const filePath = path.join(__dirname, '../../uploads/courses', `${name}`);
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
