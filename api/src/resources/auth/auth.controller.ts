import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { PrivateAccess } from './decorators';
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
  @PrivateAccess()
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const [type, token] = req.cookies['refreshToken'].split(' ') || [];

      if (type !== 'Bearer') {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const { accessToken, refreshToken } =
        await this.authService.refreshTokens(token);

      this.authService.setJwtCookies(res, { accessToken, refreshToken });

      return { message: 'Tokens refreshed successfully' };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
