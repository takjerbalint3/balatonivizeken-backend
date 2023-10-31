import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoatDto } from '../../models/dto/boat.dto';
import { Boat } from '../../models/schema/boat.schema';

@Injectable()
export class BoatService {
  constructor(
    @InjectModel(Boat.name)
    private readonly boatModel: Model<Boat>,
  ) {}

  async updateBoat(inputBoat: BoatDto): Promise<Boat> {
    if (inputBoat._id == undefined) {
      const newBoat = new this.boatModel({ ...inputBoat, _id: undefined });

      return newBoat.save();
    } else {
      return await this.boatModel.findByIdAndUpdate(inputBoat._id, inputBoat, {
        new: true,
      });
    }
  }

  async getBoatById(boatId: string): Promise<Boat> {
    return this.boatModel.findOne({ _id: boatId }).exec();
  }

  async getBoatByUserId(userId: string): Promise<Boat> {
    return this.boatModel.findOne({ userId: userId }).exec();
  }

  async getAll(): Promise<Boat[]> {
    return this.boatModel.find({ gpsEnabled: true }).lean();
  }
}
