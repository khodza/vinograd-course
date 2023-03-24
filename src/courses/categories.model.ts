import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Categories extends Document {
  @Prop({
    type: String,
    required: [true, 'Add category name_uzb'],
  })
  name_uzb: string;

  @Prop({
    type: String,
    required: [true, 'Add category name_rus'],
  })
  name_rus: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);

//CREATING INDEXES TO MAKE EMAIL AND USERNAME UNIQUE

CategoriesSchema.index(
  { name_uzb: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);

CategoriesSchema.index(
  { name_rus: 1 },
  { unique: true, collation: { locale: 'en', strength: 2 } },
);

//HANDLING DUPLICATE FIELD ERRORS

CategoriesSchema.post(['save','updateOne'], function (error, doc, next) {
  if (error.code === 11000) {
    if (error.keyPattern.name_rus) {
      next(new Error('Category rus is already exists'));
    }if(error.keyPattern.name_uzb ){
      next(new Error('Category uzb is already exists'));
    } 
     else {
      next(error);
    }
  } else {
    next(error);
  }
});
