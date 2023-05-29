import { Test, TestingModule } from '@nestjs/testing';
import { BoatController } from './boat.controller';

describe('BoatController', () => {
  let controller: BoatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoatController],
    }).compile();

    controller = module.get<BoatController>(BoatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
