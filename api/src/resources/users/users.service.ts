import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '@app/prisma';
import { UtilsService } from '@app/utils';

import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  private readonly omit: Record<string, boolean>;

  constructor(
    private readonly prisma: PrismaService,
    private readonly utilsService: UtilsService
  ) {
    this.omit = {
      password: true,
      createdAt: true,
      updatedAt: true,
    };
  }

  async findAll(take?: number, skip?: number) {
    return this.prisma.user.findMany({
      skip,
      take,
      omit: this.omit,
    });
  }

  async findOne(where: Prisma.UserWhereUniqueInput) {
    const user = await this.prisma.user.findUnique({
      where,
      omit: this.omit,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    dto: UpdateUserDto,
    isAdmin: boolean = false
  ) {
    try {
      if (!isAdmin) {
        delete dto['roles'];
      }

      const user = await this.prisma.user.update({
        where,
        data: {
          ...dto,
          password:
            dto.password && (await this.utilsService.encrypt(dto.password)),
        },
        omit: this.omit,
      });
      return user;
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('User not found');
      }

      throw e;
    }
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    try {
      await this.prisma.user.delete({ where });
      return { message: 'User deleted successful' };
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
