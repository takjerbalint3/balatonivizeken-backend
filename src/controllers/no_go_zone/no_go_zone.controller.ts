import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth_guard/auth.guard';
import { NoGoZone } from '../../models/schema/no_go_zone.schema';
import { NoGoZoneService } from '../../services/no_go_zones/no_go_zones.service';

@UseGuards(AuthGuard)
@Controller('zone')
export class NoGoZoneController {
  constructor(private noGoZoneService: NoGoZoneService) {}

  @Get()
  async getAllZones(): Promise<NoGoZone[]> {
    return this.noGoZoneService.getZones();
  }
}
