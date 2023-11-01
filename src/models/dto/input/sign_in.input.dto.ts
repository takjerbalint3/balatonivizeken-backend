import { IsString } from 'class-validator';

export class SignInInputDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
