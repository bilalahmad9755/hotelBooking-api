import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Hotel, HotelSchema } from './schema/hotel.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Hotel.name, schema: HotelSchema },
  ])],
  providers: [HotelService]
})
export class HotelModule {}
