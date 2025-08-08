import { IsEmail, IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  role: 'user' | 'admin';

  @IsString()
  password: string;
}
