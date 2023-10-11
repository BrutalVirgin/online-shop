import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreds {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDto extends UserCreds {
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class LoginDto extends UserCreds {}
