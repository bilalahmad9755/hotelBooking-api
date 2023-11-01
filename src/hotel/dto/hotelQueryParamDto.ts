import { IsNotEmpty, IsOptional } from 'class-validator';

export class HotelQueryParamDto {
  @IsNotEmpty()
  @IsOptional()
  city?: string;

  @IsNotEmpty()
  @IsOptional()
  min?: number;
  
  @IsNotEmpty()
  @IsOptional()
  max?: number;

  @IsNotEmpty()
  @IsOptional()
  limit? : number;
}
