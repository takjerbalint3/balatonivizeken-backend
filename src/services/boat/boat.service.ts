import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { BoatMarkerDto } from 'src/models/dto/boat_marker.dto';
import { GpsEnabledInput } from 'src/models/dto/input/gps_enabled.input.dto';
import { LocationInput } from 'src/models/dto/input/location_update.input.dto';
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
    { latitude, longitude }: LocationInput,
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
    if (!boat) {
      throw new NotFoundException('A hajó nem található');
    }

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
    const boat = await this.boatModel.findOne({ _id: boatId }).exec();
    if (!boat) {
      throw new NotFoundException('A hajó nem található');
    }
    return boat;
  }

  async getBoatByUserId(userId: string): Promise<Boat> {
    const boat = await this.boatModel.findOne({ userId: userId }).exec();
    if (!boat) {
      throw new NotFoundException('A hajó nem található');
    }
    return boat;
  }

  async getMarkers(centerPoint: LocationInput): Promise<BoatMarkerDto[]> {
    const boats = await this.boatModel.find({ gpsEnabled: true }).lean();

    //return only the boats in 10km range from centerPoint
    const boatsInRange: Boat[] = [];

    boats.map((boat) => {
      const distanceBetweenPoints = this._calculateHaversineDistance(
        boat.latitude,
        boat.longitude,
        centerPoint.latitude,
        centerPoint.longitude,
      );
      console.log(centerPoint, distanceBetweenPoints);

      if (distanceBetweenPoints <= 10) {
        return boatsInRange.push(boat);
      }
    });

    return plainToInstance(BoatMarkerDto, boatsInRange);
  }

  _degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  _calculateHaversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const earthRadiusKm = 6371; // Radius of the Earth in kilometers

    const dLat = this._degreesToRadians(lat2 - lat1);
    const dLon = this._degreesToRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this._degreesToRadians(lat1)) *
        Math.cos(this._degreesToRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadiusKm * c; // Distance in kilometers

    return distance;
  }
}
