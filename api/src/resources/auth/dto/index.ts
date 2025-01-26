import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Prisma, User } from '@prisma/client';

export class RegisterDto implements Prisma.UserCreateInput {
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
}

export class LoginDto {
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  password: string;
}

export class AuthResponseDto
  implements Omit<User, 'password' | 'createdAt' | 'updatedAt'>
{
  @ApiProperty()
  id: string;
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false, default: ['USER'] })
  roles: $Enums.Role[] = ['USER'];
  @ApiProperty({ required: false })
  telegram: string;
  @ApiProperty({ required: false })
  about: string;
  @ApiProperty({ required: false, isArray: true })
  skills: string[];
}
