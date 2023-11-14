import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NoGoZone,
  NoGoZoneSchema,
} from '../../models/schema/no_go_zone.schema';
import { NoGoZoneService } from '../../services/no_go_zones/no_go_zones.service';
import { NoGoZoneController } from './no_go_zone.controller';

const mongooseModul = [
  MongooseModule.forFeature([{ name: NoGoZone.name, schema: NoGoZoneSchema }]),
];
@Module({
  imports: [...mongooseModul],
  controllers: [NoGoZoneController],
  providers: [NoGoZoneService],
  exports: [NoGoZoneService, ...mongooseModul],
})
export class NoGoZoneModule {}
