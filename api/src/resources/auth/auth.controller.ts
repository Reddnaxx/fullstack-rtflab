import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './interfaces/auth-credentials.interface';
import { AuthResponseDto } from './models/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @HttpCode(200)
  public login(@Body() credentials: AuthDto) {
    return this.authService.login(credentials);
  }

  @Post('/refresh')
  public refresh(token: string) {
    return this.authService.refresh(token);
  }
}
