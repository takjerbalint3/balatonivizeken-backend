import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'user' })
export class User {
  _id?: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  emailAddress: string;

  @Prop({ required: true })
  isEmailVerified: boolean;

  @Prop({ required: true })
  familyName: string;

  @Prop({ required: true })
  givenName: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  verificationCode?: string;

  @Prop()
  passwordHash?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
