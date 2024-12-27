import { AuthDto, RegisterDto } from './auth-credentials.interface';

import { AuthResponseDto } from '../models/auth-response.dto';

export interface IAuthService {
  login(credentials: AuthDto): AuthResponseDto;
  register(credentials: RegisterDto): AuthResponseDto;
  refresh(token: string): void;
}
