import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UsersModule } from '../../../src/services/users/users.module';
import { AuthService } from '../../../src/services/auth/auth.service';

import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
