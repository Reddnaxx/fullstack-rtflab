import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { IS_PRIVATE_KEY, WITH_USER_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const withUser = this.reflector.getAllAndOverride<boolean>(WITH_USER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPrivate = this.reflector.getAllAndOverride<boolean>(
      IS_PRIVATE_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!withUser && !isPrivate) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const accessToken = this.extractTokenFromHeader(request, 'accessToken');

    if (!accessToken && !isPrivate) {
      return true;
    }

    if (!accessToken && isPrivate) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      await this.verifyToken(accessToken, request);
    } catch (err) {
      try {
        if (!(err instanceof TokenExpiredError)) {
          throw new UnauthorizedException('Invalid token');
        }

        const refreshToken = this.extractTokenFromHeader(
          request,
          'refreshToken'
        );

        const newTokens = await this.refreshTokens(refreshToken);

        this.verifyToken(newTokens.accessToken, request);

        this.authService.setJwtCookies(response, newTokens);
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          throw new UnauthorizedException('Refresh token expired');
        } else if (err instanceof UnauthorizedException) {
          throw err;
        }
        throw new UnauthorizedException('Invalid token');
      }
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request,
    name: string
  ): string | undefined {
    const [type, token] = request.cookies[name]?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }

  private async verifyToken(token: string, request: Request) {
    const payload = await this.jwtService.verifyAsync(token);
    request['user'] = payload;
  }

  private async refreshTokens(refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }
}
