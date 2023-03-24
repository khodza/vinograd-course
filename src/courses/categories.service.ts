import { Categories } from './categories.model';
import { BadRequestException, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';


@Injectable()
export class CategoriesService {

    constructor(
        @InjectModel(Categories.name) private readonly categoryModel: Model<Categories>,
      ) {}

      async create(createCategoryDto: CreateCategoryDto,): Promise<Categories> {
        try {
          const newCategory = await this.categoryModel.create(createCategoryDto);
          return newCategory;
        } catch (err) {
          throw new BadRequestException(err.message,err);
        }
      }


      async findAll():Promise<Categories[]> {
        try {
          const categories = await this.categoryModel.find()
          return categories;
        } catch (err) {
          throw new BadRequestException(err);
        }
      }
    
      async findOne(id: string):Promise<Categories> {
        try {
          if (!mongoose.Types.ObjectId.isValid(id)){
            throw new BadRequestException('Provide valid ID')
          }
          const category = await this.categoryModel.findById(id);
          if (!category) {
            throw new BadRequestException(`No category with this ID : ${id}`);
          }
          return category;
        } catch (err) {
          throw new BadRequestException(err.message,err);
        }
      }

      async remove(id: string):Promise<{message:string}> {
        try {
          if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new BadRequestException(`Provide valid ID: ${id}`);
          }
          const deletedCategory = await this.categoryModel.findByIdAndDelete(id);
          if (!deletedCategory) {
            throw new BadRequestException(`No category with this ID : ${id}`);
          }
          return { message: `Category with ID ${id} has been deleted` };
        } catch (err) {
          throw new BadRequestException(err.message, err);
        }
      }

}
