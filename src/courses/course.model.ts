import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Categories } from './categories.model';

@Schema()
export class Course extends Document {
  @Prop({
    type: String,
    required: [true, 'Add rus name'],
  })
  name_rus: string;

  @Prop({
    type: String,
    required: [true, 'Add uzb name'],
  })
  name_uzb: string;

  @Prop({
    type: String,
    required: [true, 'Add rus content'],
  })
  content_rus: string;

  @Prop({
    type: String,
    required: [true, 'Add uzb content'],
  })
  content_uzb: string;

  @Prop({
    type: Number,
    required: [true, 'Add valid price'],
  })
  price: number;

  @Prop({
    type: Date,
    required: [true, 'Add valid date'],
  })
  startDate: Date;
  
  @Prop({ type:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categories' }] })
  categories: Categories[];

  @Prop({type:String,required:[true,'Please add photo to course']})
  photo:string;


  //Timestamps
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

}

export const CourseSchema = SchemaFactory.createForClass(Course);

//CREATING INDEXES TO MAKE EMAIL AND USERNAME UNIQUE

// CourseSchema.index(
//   { name_uzb: 1 },
//   { unique: true, collation: { locale: 'en', strength: 2 } },
// );

// CourseSchema.index(
//   { name_rus: 1 },
//   { unique: true, collation: { locale: 'en', strength: 2 } },
// );
//HANDLING DUPLICATE FIELD ERRORS

CourseSchema.post(['save','updateOne'], function (error, doc, next) {
  if (error.code === 11000) {
    if (error.keyPattern.name) {
      next(new Error('Course address already exists'));
    }  else {
      next(error);
    }
  } else {
    next(error);
  }
});
