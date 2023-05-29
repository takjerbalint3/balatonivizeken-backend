import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AuthModule } from './controllers/auth/auth.module';
import { UsersModule } from './services/users/users.module';
import { BoatModule } from './controllers/boat/boat.module';
import config from './config/keys';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(config.mongoURI),
    BoatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
