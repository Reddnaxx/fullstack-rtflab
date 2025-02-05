import { ApiProperty } from '@nestjs/swagger';
import type { Prisma, Role } from '@prisma/client';

export class UserDto implements Omit<Prisma.UserCreateInput, 'password'> {
  @ApiProperty()
  id: string;
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  roles: Role[];
  @ApiProperty({ nullable: true, format: 'binary' })
  avatar: string;
  @ApiProperty({ nullable: true })
  telegram?: string;
  @ApiProperty({ nullable: true })
  about?: string;
  @ApiProperty({ nullable: true, isArray: true })
  skills?: string[];
}

export class UserFullDto implements Prisma.UserCreateInput {
  @ApiProperty()
  id: string;
  @ApiProperty({ format: 'email' })
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  roles: Role[];
  @ApiProperty({ nullable: true, format: 'binary' })
  avatar?: string;
  @ApiProperty({ nullable: true })
  telegram?: string;
  @ApiProperty({ nullable: true })
  about?: string;
  @ApiProperty({ nullable: true, isArray: true })
  skills?: string[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
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
  @ApiProperty({ nullable: true, required: false, format: 'binary' })
  avatar?: string;
  @ApiProperty({ nullable: true, required: false })
  telegram?: string;
  @ApiProperty({ nullable: true, required: false })
  about?: string;
  @ApiProperty({ nullable: true, required: false, isArray: true })
  skills?: string[];
}
