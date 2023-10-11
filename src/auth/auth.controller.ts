import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Response() res: any, @Body() registerDto: RegisterDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.createUser(registerDto));
  }

  @Post('login')
  async login(@Response() res: any, @Body() loginDto: LoginDto) {
    return res
      .status(HttpStatus.OK)
      .json(await this.authService.login(loginDto));
  }
}
