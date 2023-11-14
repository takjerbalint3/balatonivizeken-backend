import { Module } from '@nestjs/common';
import { AuthModule } from '../../src/controllers/auth/auth.module';
import { BoatModule } from '../../src/controllers/boat/boat.module';
import { NoGoZoneModule } from '../../src/controllers/no_go_zone/no_go_zone.module';
import { UsersModule } from '../../src/services/users/users.module';
import { TestBoatProvider } from './test-boat.provider';
import { TestUserProvider } from './test-user.provider';

@Module({
  imports: [AuthModule, BoatModule, UsersModule, NoGoZoneModule],
  providers: [TestUserProvider, TestBoatProvider],
  exports: [TestUserProvider, TestBoatProvider],
})
export class TestProviderModule {}
