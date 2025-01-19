import { Module } from '@nestjs/common';

import { PrismaModule } from '@app/prisma';
import { UtilsModule } from '@app/utils';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, UtilsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
