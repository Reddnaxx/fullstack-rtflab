import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';

import { PrismaModule } from '@app/prisma';
import { UtilsModule } from '@app/utils';
import { multerConfig } from 'src/configs';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, UtilsModule, MulterModule.register(multerConfig)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
