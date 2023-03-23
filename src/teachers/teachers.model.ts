import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Teacher extends Document {
  @Prop({
    type: String,
    required: [true, 'Add uzb name'],
  })
  name_uzb: string;

  @Prop({
    type: String,
    required: [true, 'Add rus name'],
  })
  name_rus: string;

  @Prop({type:String,required:[true,'Please add photo to teacher']})
  photo:string;

  //Timestamps
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

//CREATING INDEXES TO MAKE EMAIL AND USERNAME UNIQUE

// CourseSchema.index(
//   { name: 1 },
//   { unique: true, collation: { locale: 'en', strength: 2 } },
// );


//HANDLING DUPLICATE FIELD ERRORS

TeacherSchema.post(['save','updateOne'], function (error, doc, next) {
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
