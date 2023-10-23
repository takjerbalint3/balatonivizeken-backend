import { Controller, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { AuthGuard } from '../../auth_guard/auth.guard';
import { BoatDto } from '../../models/dto/boat.dto';
import { BoatService } from '../../services/boat/boat.service';

@UseGuards(AuthGuard)
@Controller('boat')
export class BoatController {
  constructor(private boatService: BoatService) {}

  @Get()
  async getAllBoats() {
    return this.boatService.getAll();
  }

  @Get('by-boat-id/:id')
  async getSingleBoatById(@Param('id') id: string) {
    return this.boatService.getBoatById(id);
  }

  @Get('by-user-id/:id')
  async getSingleBoatByUserId(@Param('id') id: string) {
    return this.boatService.getBoatByUserId(id);
  }

  @Post('update')
  async updateBoat(@Body() payload: BoatDto) {
    return this.boatService.updateBoat(payload);
  }
}
