import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course } from './course.model';


@Schema()
export class Categories extends Document {
  @Prop({
    type: String,
    required: [true, 'Add category name'],
  })
  name: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);

//CREATING INDEXES TO MAKE EMAIL AND USERNAME UNIQUE

CategoriesSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);

//HANDLING DUPLICATE FIELD ERRORS


// CategoriesSchema.pre('remove', function(next) {
//     // 'this' refers to the document being removed
//     const categoryId = this._id;
//     // update all courses that reference this category
//     Course.updateMany({ categories: categoryId }, { $pull: { categories: categoryId } }, next);
//   });


CategoriesSchema.post(['save','updateOne'], function (error, doc, next) {
  if (error.code === 11000) {
    if (error.keyPattern.name) {
      next(new Error('Category is already exists'));
    }  else {
      next(error);
    }
  } else {
    next(error);
  }
});
