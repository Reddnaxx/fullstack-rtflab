import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

import { PrismaService } from '@app/prisma';
import { UtilsService } from '@app/utils';
import { jwtConfig } from 'src/configs';

import { LoginDto, RegisterDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly utils: UtilsService,
    private readonly jwtService: JwtService
  ) {}

  async register(data: RegisterDto) {
    try {
      const password = await this.utils.encrypt(data.password);
      const user = await this.prisma.user.create({
        data: {
          ...data,
          password,
          roles: ['USER'],
        },
        omit: {
          createdAt: true,
          updatedAt: true,
          password: true,
        },
      });

      const payload = { sub: user.id, roles: user.roles };
      const refreshPayload = { ...payload, refresh: true };

      return {
        user,
        tokens: {
          accessToken: await this.jwtService.signAsync(payload, {
            expiresIn: jwtConfig.accessTokenExpiresIn,
          }),
          refreshToken: await this.jwtService.signAsync(refreshPayload, {
            expiresIn: jwtConfig.refreshTokenExpiresIn,
          }),
        },
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'User with provided email already exists'
          );
        }
      }
    }
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });

    if (user) {
      const passwordMatch = await this.utils.compareHash(
        data.password,
        user.password
      );

      if (passwordMatch) {
        delete user.password;

        const payload = { sub: user.id, roles: user.roles };
        const refreshPayload = { ...payload, refresh: true };

        return {
          user,
          tokens: {
            accessToken: await this.jwtService.signAsync(payload, {
              expiresIn: jwtConfig.accessTokenExpiresIn,
            }),
            refreshToken: await this.jwtService.signAsync(refreshPayload, {
              expiresIn: jwtConfig.refreshTokenExpiresIn,
            }),
          },
        };
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshTokens(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken);

    if (!payload.refresh) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshPayload = { ...payload, refresh: true };

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      omit: {
        createdAt: true,
        updatedAt: true,
        password: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(refreshPayload),
    };
  }

  async validateToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch {
      return false;
    }
  }

  async logout(response: Response) {
    response.clearCookie('accessToken');
    response.clearCookie('refreshToken');
  }

  setJwtCookies(
    response: Response,
    tokens: { accessToken: string; refreshToken: string }
  ) {
    response.cookie('accessToken', 'Bearer ' + tokens.accessToken, {
      httpOnly: true,
    });
    response.cookie('refreshToken', 'Bearer ' + tokens.refreshToken, {
      httpOnly: true,
    });
  }
}
