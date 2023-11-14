import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BoatMarkerDto } from 'src/models/dto/boat_marker.dto';
import { GpsEnabledInput } from 'src/models/dto/input/gps_enabled.input.dto';
import { LocationInput } from 'src/models/dto/input/location_update.input.dto';
import { Boat } from 'src/models/schema/boat.schema';
import { AuthGuard } from '../../auth_guard/auth.guard';
import { BoatInputDto } from '../../models/dto/input/boat.input.dto';
import { BoatService } from '../../services/boat/boat.service';

@UseGuards(AuthGuard)
@Controller('boat')
export class BoatController {
  constructor(private boatService: BoatService) {}

  @Get()
  async getAllMarkers(
    @Body() centerPoint: LocationInput,
  ): Promise<BoatMarkerDto[]> {
    return this.boatService.getMarkers(centerPoint);
  }

  @Get('by-boat-id/:id')
  async getSingleBoatById(@Param('id') id: string): Promise<Boat> {
    return this.boatService.getBoatById(id);
  }

  @Get('by-user-id/:id')
  async getSingleBoatByUserId(@Param('id') id: string): Promise<Boat> {
    return this.boatService.getBoatByUserId(id);
  }

  @Post('update')
  async updateBoat(@Body() payload: BoatInputDto): Promise<Boat> {
    return this.boatService.updateBoat(payload);
  }

  @Post('location/:id')
  async updateLocation(
    @Param('id') id: string,
    @Body() payload: LocationInput,
  ): Promise<void> {
    await this.boatService.updateLocation(id, payload);
  }

  @Post('gps/:id')
  async updateGpsEnabled(
    @Param('id') id: string,
    @Body() payload: GpsEnabledInput,
  ): Promise<void> {
    await this.boatService.updateGpsEnabled(id, payload);
  }
}
