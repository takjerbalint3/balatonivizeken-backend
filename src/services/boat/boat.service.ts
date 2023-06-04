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
    console.log('miafasz');
    if (inputBoat._id == undefined) {
      console.log('Create new Boat');

      const newBoat = new this.boatModel(inputBoat);
      newBoat.save();
      console.log(newBoat);
      return newBoat;
    } else {
      console.log('Update boat');
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
