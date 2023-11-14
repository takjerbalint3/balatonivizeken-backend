import { IsNumber } from 'class-validator';

export class LocationInput {
  @IsNumber()
  longitude: number;

  @IsNumber()
  latitude: number;
}
