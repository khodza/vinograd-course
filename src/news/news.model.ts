import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class News extends Document {
  @Prop({
    type: String,
    required: [true, 'Add russian header'],
  })
  headerRus: string;

  @Prop({
    type: String,
    required: [true, 'Add uzbek header'],
  })
  headerUzb: string;

  @Prop({
    type: String,
    required: [true, 'Add russian content1'],
  })
  content1rus: string;

  @Prop({
    type: String,
    required: [true, 'Add uzbek content2'],
  })
  content2uzb: string;

  @Prop({
    type: String,
    required: [true, 'Add russian content2'],
  })
  content2rus: string;

  @Prop({
    type: String,
    required: [true, 'Add uzbek content1'],
  })
  content1uzb: string;
  
  //Photos

  @Prop({type:String,required:[true,'Please add photo1 to news']})
  photo1:string;

  @Prop({type:String,required:[true,'Please add photo2 to news']})
  photo2:string;

  @Prop({type:String,required:[true,'Please add photo3 to news']})
  photo3:string;

  @Prop({type:String,required:[true,'Please add photo4 to news']})
  photo4:string;


  //Timestamps
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

}

export const NewsSchema = SchemaFactory.createForClass(News);

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

NewsSchema.post(['save','updateOne'], function (error, doc, next) {
  if (error.code === 11000) {
    if (error.keyPattern.name) {
      next(new Error('News address already exists'));
    }  else {
      next(error);
    }
  } else {
    next(error);
  }
});
