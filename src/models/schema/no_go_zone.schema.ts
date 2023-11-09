import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LatLng } from './lat_lng.schema';

export type NoGoZoneDocument = NoGoZone & Document;

@Schema({ collection: 'nogozone' })
export class NoGoZone {
  _id?: Types.ObjectId;

  @Prop({ required: true })
  zonePoints: LatLng[];
}

export const NoGoZoneSchema = SchemaFactory.createForClass(NoGoZone);
