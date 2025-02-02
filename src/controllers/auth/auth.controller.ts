import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { RegistrationInputDto } from '../../models/dto/input/registration.input.dto';
import { SignInInputDto } from '../../models/dto/input/sign_in.input.dto';
import { AuthService } from '../../services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInInputDto) {
    return await this.authService.signIn(signInDto);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationInputDto) {
    return await this.authService.registration(registrationDto);
  }
}
