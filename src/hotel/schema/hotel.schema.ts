import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IntegerType } from 'mongodb';
import { HydratedDocument } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ required: true })
  name: string;
  @Prop({required: true})
  type: string
  @Prop({required: true})
  city: string
  @Prop({required: true})
  address: string
  @Prop({required: true})
  description: string
  @Prop({required: true})
  coverPhoto: string
  @Prop({required: true, min:0, max:5 })
  rating: Number
  @Prop({required: true})
  rooms: [string]
  @Prop({required: true})
  photos: [string]
  @Prop({required: true})
  cheapestPrice: number
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);