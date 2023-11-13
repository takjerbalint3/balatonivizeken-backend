import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { BoatMarkerDto } from 'src/models/dto/boat_marker.dto';
import { GpsEnabledInput } from 'src/models/dto/input/gps_enabled.input.dto';
import { LocationUpdateInput } from 'src/models/dto/input/location_update.input.dto';
import { BoatInputDto } from '../../models/dto/input/boat.input.dto';
import { Boat } from '../../models/schema/boat.schema';

@Injectable()
export class BoatService {
  constructor(
    @InjectModel(Boat.name)
    private readonly boatModel: Model<Boat>,
  ) {}

  async updateGpsEnabled(
    id: string,
    { gpsEnabled }: GpsEnabledInput,
  ): Promise<void> {
    await this.boatModel.findByIdAndUpdate(id, { gpsEnabled: gpsEnabled });
  }

  async updateLocation(
    id: string,
    { latitude, longitude }: LocationUpdateInput,
  ): Promise<void> {
    const boat = await this.boatModel
      .findByIdAndUpdate(
        { _id: id },
        {
          latitude: latitude,
          longitude: longitude,
        },
      )
      .lean();
    if (boat.lastPositions.length == 5) {
      await this.boatModel
        .findByIdAndUpdate(
          { _id: id },
          {
            $pop: { lastPositions: -1 },
          },
        )
        .lean();
    }
    await this.boatModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $push: {
            lastPositions: { latitude: latitude, longitude: longitude },
          },
        },
      )
      .lean();
  }

  async updateBoat(inputBoat: BoatInputDto): Promise<Boat> {
    console.log(inputBoat);
    if (inputBoat._id == undefined) {
      const newBoat = new this.boatModel({
        ...inputBoat,
        _id: undefined,
        lastPositions: [
          { latitude: inputBoat.latitude, longitude: inputBoat.longitude },
        ],
      });

      return newBoat.save();
    } else {
      return await this.boatModel.findByIdAndUpdate(inputBoat._id, inputBoat, {
        new: true,
      });
    }
  }

  async getBoatById(boatId: string): Promise<Boat> {
    return await this.boatModel.findOne({ _id: boatId }).exec();
  }

  async getBoatByUserId(userId: string): Promise<Boat> {
    return await this.boatModel.findOne({ userId: userId }).exec();
  }

  async getMarkers(): Promise<BoatMarkerDto[]> {
    const boats = await this.boatModel.find({ gpsEnabled: true });

    return plainToInstance(BoatMarkerDto, boats);
  }
}
