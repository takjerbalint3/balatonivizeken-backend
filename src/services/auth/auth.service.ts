import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import config from '../../config/keys';
import * as bcrypt from 'bcrypt';
import { RegistrationInputDto } from '../../models/dto/input/registration.input.dto';
import { User } from '../../models/schema/user.schema';
import * as crypto from 'crypto';
import { SignInInputDto } from 'src/models/dto/input/sign_in.input.dto';

const salt = config.saltValue;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInInputDto) {
    const user = await this.usersService.findOne(signInDto.username);
    if (!user) {
      throw new NotFoundException('Felhasználó nem létezik');
    }
    const inputPasswordHash = await bcrypt.hash(signInDto.password, salt);
    if (user?.passwordHash !== inputPasswordHash) {
      throw new NotFoundException(
        'A megadott jelszó hibás, próbálja újra, vagy kérjen új jelszót!',
      );
    }
    const payload = { username: user.username, sub: user._id };
    return {
      id: user._id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  _generateRandomCode() {
    return crypto.randomBytes(32).toString('hex');
  }

  async registration(registration: RegistrationInputDto) {
    let user = await this.usersService.findByEmailAddress(
      registration.emailAddress,
    );

    if (user) {
      throw new BadRequestException('Ezzel az emaillel már regisztráltak!');
    }
    user = await this.usersService.findOne(registration.username);

    if (user) {
      throw new BadRequestException(
        'Ezzel a felhasználónévvel már regisztráltak!',
      );
    }

    const newUser = new User();
    newUser.familyName = registration.familyName;
    newUser.givenName = registration.givenName;
    newUser.emailAddress = registration.emailAddress;
    newUser.verificationCode = this._generateRandomCode();
    newUser.isEmailVerified = false;
    newUser.username = registration.username;
    const passwordHash = await bcrypt.hash(registration.password, salt);
    newUser.passwordHash = passwordHash;

    const createdUser = await this.usersService.create(newUser);

    /* TODO emailVerification
    const verifyEmailData = {
      welcome: 'Kedves ' + newUser.givenName + '!',
      body: 'Sikeresen regisztráltál, kérlek a lent található linkre kattintva erősítsd meg email címed.',
      button_label: 'Megerősít!',
      email_verification_link:
        '/email-verification?userId=' +
        createdUser._id.toString() +
        '&code=' +
        createdUser.verificationCode,
      support: 'Támogatásra van szüksége?',
      support_link_label: 'Itt vagyunk, segítünk!',
    };
    const verificationTemplate = new EmailTemplateTypeParams(
      EmailTemplateName.VERIFICATION,
      'Email cím megerősítés',
    );

   
    await this.mailService.sendWithTemplate(
      newUser.emailAddress,
      verificationTemplate,
      verifyEmailData,
    );
*/
    const payload = { username: createdUser.username, sub: createdUser._id };
    return {
      id: createdUser._id,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
