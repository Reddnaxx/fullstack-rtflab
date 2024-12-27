import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty()
  password: string;
}

export interface RegisterDto extends AuthDto {
  name: string;
}
