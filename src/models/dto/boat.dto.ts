import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class BoatDto {
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
}
