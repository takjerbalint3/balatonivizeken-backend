import { IsString } from 'class-validator';

export class RegistrationInputDto {
  @IsString()
  username: string;

  @IsString()
  emailAddress: string;

  @IsString()
  password: string;

  @IsString()
  familyName: string;

  @IsString()
  givenName: string;
}
