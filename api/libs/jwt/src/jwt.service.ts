import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, TokenExpiredError, verify } from 'jsonwebtoken';

import { JWTConfigProps } from '@/config';

import { IJWTService, Tokens } from './jwt.service.interface';
import {
  defaultAccessExpireMinutes,
  defaultRefreshExpireHours,
} from './constants/expire';

@Injectable()
export class JwtService implements IJWTService {
  constructor(private readonly config: ConfigService) {}

  private get key(): string {
    return this.config.getOrThrow<JWTConfigProps>('jwt').secret;
  }

  private get accessTokenExpireMinutes(): number {
    return parseInt(
      this.config.get<JWTConfigProps>('jwt')?.accessTokenExpireMinutes ??
        defaultAccessExpireMinutes,
    );
  }

  private get refreshTokenExpireHours(): number {
    return parseInt(
      this.config.get<JWTConfigProps>('jwt')?.refreshTokenExpireHours ??
        defaultRefreshExpireHours,
    );
  }

  createToken(sub: string, refresh?: boolean): string {
    const expireDelta = refresh
      ? this.refreshTokenExpireHours * 60
      : this.accessTokenExpireMinutes;
    const expDate = new Date();
    expDate.setMinutes(expDate.getMinutes() + expireDelta);

    const exp = expDate.getTime() / 1000;

    const token = sign({ sub, exp }, this.key);

    return token;
  }

  createTokenPair(sub: string): Tokens {
    const access = this.createToken(sub);
    const refresh = this.createToken(sub, true);

    return { access, refresh };
  }

  refreshToken(token: string): Tokens {
    try {
      const { sub } = verify(token, this.key) as { sub: string };
      return this.createTokenPair(sub);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new HttpException('Token expired', 401);
      }

      throw new HttpException('Invalid token', 401);
    }
  }
}
