import { ApiProperty } from '@nestjs/swagger';

import { Role, User } from '@/models/user.model';

type TAuthResponseDto = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;

export class AuthResponseDto implements TAuthResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: ['admin', 'user'] })
  role: Role;
}
