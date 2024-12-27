import { Injectable, NotFoundException } from '@nestjs/common';

import { JwtService } from '@app/jwt';

import { IAuthService } from './interfaces/auth.service.interface';
import { AuthDto, RegisterDto } from './interfaces/auth-credentials.interface';
import { AuthResponseDto } from './models/auth-response.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwt: JwtService) {}

  login(credentials: AuthDto): AuthResponseDto {
    const { email, password } = credentials;

    if (email === 'test' && password === 'test') {
      return {
        id: '1',
        email: 'test',
        name: 'test',
        role: 'admin',
      };
    }

    throw new NotFoundException('User with such credentials not found');
  }

  register(credentials: RegisterDto): AuthResponseDto {
    throw new Error('Method not implemented.');
  }

  refresh(token: string): void {
    throw new Error('Method not implemented.');
  }
}
