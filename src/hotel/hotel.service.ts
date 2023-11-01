import { Injectable, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './schema/hotel.schema';
import { Model } from 'mongoose';
import { AddHotelDto } from './dto/addHotelDto';
import { HotelQueryParamDto } from './dto/hotelQueryParamDto';
import { max, min } from 'class-validator';

@Injectable()
export class HotelService {
  constructor(@InjectModel(Hotel.name) private hotelModel: Model<Hotel>) {}

  async getAllHotels(queryParams?: HotelQueryParamDto) {
    console.log('queryParams: ', queryParams);
    console.log('city: ', queryParams?.city);
    console.log('min: ', min);
    console.log('max: ', max);
    if (JSON.stringify(queryParams) === '{}') {
      console.log('object is empty, fetching all records...');
      return await this.hotelModel.find().exec();
    } else {
      console.log('query params not empty...');
      if (queryParams.limit === undefined) {
        console.log('limit undefined');
        return await this.hotelModel
          .find({
            city: queryParams?.city,
            cheapestPrice: { $gt: queryParams?.min ?? 0, $lt: queryParams?.max ?? 999 },
          })
          .exec();
      } else {
        console.log('limit not undefined...query params not all undefined...');
        let _queryParams = { ...queryParams, limit: undefined };
        return await this.hotelModel
          .find({
            city: _queryParams?.city,
            cheapestPrice: {
              $gt: queryParams?.min ?? 0,
              $lt: queryParams?.max ?? 999,
            },
          })
          .limit(queryParams?.limit)
          .exec();
      }
    }
  }

  async addHotel(addHotelDto: AddHotelDto) {
    let newHotel = new this.hotelModel(addHotelDto);
    await newHotel.save();
    return true;
  }

  async getAllTypes() {
    return await this.hotelModel.distinct('type');
  }

  async findHotel(id: string): Promise<any> {
    return await this.hotelModel.findOne({ _id: id }).exec();
  }
}
