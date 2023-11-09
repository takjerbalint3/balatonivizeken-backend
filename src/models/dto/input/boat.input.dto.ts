import {
  IsBoolean,
  IsHexColor,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class BoatInputDto {
  @IsString()
  _id?: string;

  @IsString()
  userId: string;

  @IsString()
  boatType: string;

  @IsString()
  displayName: string;

  @IsBoolean()
  gpsEnabled: boolean;

  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsHexColor()
  boatColor?: string;
}
