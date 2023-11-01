import { IsBoolean } from 'class-validator';

export class GpsEnabledInput {
  @IsBoolean()
  gpsEnabled: boolean;
}
