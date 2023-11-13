import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LatLng } from './lat_lng.schema';

export type BoatDocument = Boat & Document;

@Schema({ collection: 'boat' })
export class Boat {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  boatType: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  gpsEnabled: boolean;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  lastPositions: LatLng[];

  @Prop()
  boatColor?: string;
}

export const BoatSchema = SchemaFactory.createForClass(Boat);
