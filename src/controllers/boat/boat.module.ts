import { Module } from '@nestjs/common';
import { BoatController } from './boat.controller';
import { BoatService } from '../../services/boat/boat.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Boat, BoatSchema } from '../../models/schema/boat.schema';
const mongooseModul = [
  MongooseModule.forFeature([{ name: Boat.name, schema: BoatSchema }]),
];
@Module({
  imports: [...mongooseModul],
  controllers: [BoatController],
  providers: [BoatService],
  exports: [BoatService, ...mongooseModul],
})
export class BoatModule {}
