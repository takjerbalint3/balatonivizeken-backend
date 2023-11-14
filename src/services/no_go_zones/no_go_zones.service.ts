import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoGoZone } from '../../models/schema/no_go_zone.schema';

@Injectable()
export class NoGoZoneService {
  constructor(
    @InjectModel(NoGoZone.name)
    private readonly noGoZoneModel: Model<NoGoZone>,
  ) {}

  async getZones(): Promise<NoGoZone[]> {
    const noGoZones = await this.noGoZoneModel.find({}).lean();

    return noGoZones;
  }
}
