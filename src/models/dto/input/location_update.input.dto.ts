import { IsNumber } from 'class-validator';

export class LocationUpdateInput {
  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;
}
