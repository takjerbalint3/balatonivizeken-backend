import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Boat } from '../../src/models/schema/boat.schema';

@Injectable()
export class TestBoatProvider {
  defaultBoat: Boat | null;

  constructor(
    @InjectModel(Boat.name)
    private boatModel: Model<Boat>,
  ) {}

  async init(): Promise<void> {
    const tmp = await this.boatModel.create({
      userId: '64c38c441ae9028fd6fa6b8b',
      boatType: 'smallBoat',
      displayName: 'tak',
      gpsEnabled: 'true',
      longitude: 17.49,
      latitude: 46.759,
      lastPositions: [
        { latitude: 46.759, longitude: 17.49 },
        { latitude: 46.759, longitude: 17.49 },
        { latitude: 46.759, longitude: 17.49 },
        { latitude: 46.759, longitude: 17.49 },
        { latitude: 46.759, longitude: 17.49 },
      ],
      boatColor: '0xffa03434',
    });

    this.defaultBoat = tmp.toObject();
  }
}
