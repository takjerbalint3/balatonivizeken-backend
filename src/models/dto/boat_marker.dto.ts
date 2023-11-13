import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Boat } from '../schema/boat.schema';
import { LatLng } from '../schema/lat_lng.schema';

@Exclude()
export class BoatMarkerDto implements Boat {
  @Expose()
  @Transform((value) => new Types.ObjectId(value.obj._id), {
    toClassOnly: true,
  })
  @Type(() => String)
  _id?: Types.ObjectId;

  @Expose()
  longitude: number;

  @Expose()
  latitude: number;

  userId: string;
  boatType: string;
  displayName: string;
  gpsEnabled: boolean;
  lastPositions: LatLng[];
  boatColor?: string;
}
