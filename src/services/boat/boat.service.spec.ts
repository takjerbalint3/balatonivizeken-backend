import { Test, TestingModule } from '@nestjs/testing';
import { BoatService } from './boat.service';

describe('BoatService', () => {
  let service: BoatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoatService],
    }).compile();

    service = module.get<BoatService>(BoatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
