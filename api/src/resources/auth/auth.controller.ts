import {
  Body,
  Controller,
  NotImplementedException,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { AuthResponseDto, LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    const { user, tokens } = await this.authService.login(dto);

    this.authService.setJwtCookies(response, tokens);

    return user;
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'User with provided email already exists',
  })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response
  ): Promise<AuthResponseDto> {
    const { user, tokens } = await this.authService.register(dto);

    this.authService.setJwtCookies(response, tokens);

    return user;
  }

  @Post('refresh')
  async refresh() {
    throw new NotImplementedException('This method is not implemented');
  }
}
