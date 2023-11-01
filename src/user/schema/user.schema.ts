import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isStrongPassword } from 'class-validator';
import { IntegerType } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({required: true})
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User);

