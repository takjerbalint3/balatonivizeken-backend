import { Controller, Get, UseGuards } from '@nestjs/common';
import { NoGoZone } from 'src/models/schema/no_go_zone.schema';
import { NoGoZoneService } from 'src/services/no_go_zones/no_go_zones.service';
import { AuthGuard } from '../../auth_guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('zone')
export class NoGoZoneController {
  constructor(private noGoZoneService: NoGoZoneService) {}

  @Get()
  async getAllZones(): Promise<NoGoZone[]> {
    return this.noGoZoneService.getZones();
  }
}
