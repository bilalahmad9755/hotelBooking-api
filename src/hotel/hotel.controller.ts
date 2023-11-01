import { Controller, Optional, Param } from '@nestjs/common';
import { Get, Post, Body, Res, Req, Query} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { AddHotelDto } from './dto/addHotelDto';
import { Response, Request, response } from 'express';
import { HotelQueryParamDto } from './dto/hotelQueryParamDto';
@Controller('hotel')
export class HotelController {
    constructor(private readonly hotelService: HotelService)
    {}
    @Get('getAll')
    async getAllHotels(@Res() response: Response, @Query() hotelQuery: HotelQueryParamDto)
    {
        let hotels = await this.hotelService.getAllHotels(hotelQuery);
        return response.status(200).json({message: "fetched all hotels", code: 200, payload: hotels});
    }

    @Get('getHotelTypes')
    async getHotelTypes(@Res() response: Response)
    {
        let hotelTypes = await this.hotelService.getAllTypes();
        return response.status(200).json({message: "fetched all hotel types", code:200, payload: hotelTypes})
    }

    @Post('addHotel')
    async addHotel(@Body() addHotelDto: AddHotelDto, @Res() response: Response)
    {
        await this.hotelService.addHotel(addHotelDto);
        return response.status(202).json({message: "hotel added", code: 202, payload: addHotelDto})
    }
    @Get('/find/:id')
    async findHotel(@Param('id') id: string, @Res() response: Response)
    {
        let hotel = await this.hotelService.findHotel(id);
        console.log("record found: ", hotel);
        return response.status(200).json({message: "hotel details found...", code: 200, payload: hotel})
    }
}
