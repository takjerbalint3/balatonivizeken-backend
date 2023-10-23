import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { SignInDto } from 'src/models/dto/sign_in.dto';
import { RegistrationDto } from 'src/models/dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return await this.authService.registration(registrationDto);
  }
}
