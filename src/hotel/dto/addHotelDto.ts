import { IsNotEmpty } from 'class-validator';
export class AddHotelDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  coverPhoto: string;

  @IsNotEmpty()
  rating: Number;

  @IsNotEmpty()
  rooms: [string];
  @IsNotEmpty()
  photos: [string]

  @IsNotEmpty()
  cheapestPrice: Number;
}
