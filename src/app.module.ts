import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

import { AppService } from './app.service';
import config from './config/keys';
import { AuthModule } from './controllers/auth/auth.module';
import { BoatModule } from './controllers/boat/boat.module';
import { NoGoZoneModule } from './controllers/no_go_zone/no_go_zone.module';
import { UsersModule } from './services/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    BoatModule,
    NoGoZoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
