import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoatDto } from '../../models/dto/boat.dto';
import { Boat, BoatDocument } from '../../models/schema/boat.schema';

@Injectable()
export class BoatService {
  constructor(
    @InjectModel(Boat.name)
    private readonly boatModel: Model<BoatDocument>,
  ) {}

  async updateBoat(inputBoat: BoatDto) {
    if (inputBoat._id == undefined) {
      const newBoat = await this.boatModel.create(inputBoat);

      return newBoat;
    } else {
      return await this.boatModel.findByIdAndUpdate(inputBoat._id, inputBoat);
    }
  }

  async getBoatById(boatId: string) {
    return this.boatModel.findOne({ _id: boatId }).exec();
  }

  async getBoatByUserId(userId: string) {
    return this.boatModel.findOne({ userId: userId }).exec();
  }

  async getAll() {
    return this.boatModel.find({ gpsEnabled: true }).exec();
  }
}
