import { ApiProperty } from '@nestjs/swagger';
import type { $Enums, Prisma } from '@prisma/client';

export class UserDto implements Prisma.UserCreateInput {
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  roles: $Enums.Role[];
}

export class CreateUserDto implements Prisma.UserCreateInput {
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
}

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @ApiProperty({ required: false, format: 'email' })
  email?: string;
  @ApiProperty({ required: false })
  password?: string;
  @ApiProperty({ required: false })
  name?: string;
}
