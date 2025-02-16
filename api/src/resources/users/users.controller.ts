import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOkResponse, ApiConsumes } from '@nestjs/swagger';
import { Request } from 'express';

import { UtilsService } from '@app/utils';
import { staticFolder } from 'src/configs';
import { QueryListAllEntities } from 'src/shared/dto/query';

import { UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { PrivateAccess, RolesAccess } from '../auth/decorators';
import { AdminAccess } from '../auth/decorators/admin.decorator';
import { CardDto } from '../cards/dto';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilsService: UtilsService
  ) {}

  @Get()
  @ApiOkResponse({ type: UserDto, isArray: true })
  @AdminAccess()
  async findAll(@Query() query: QueryListAllEntities) {
    return this.usersService.findAll(+query.take, +query.skip);
  }

  @Get('current')
  @ApiOkResponse({ type: UserDto })
  @PrivateAccess()
  async getCurrent(@Req() req: Request) {
    const payload = req['user'];

    if (!payload) {
      throw new UnauthorizedException();
    }

    const id = payload.sub;

    return this.usersService.findOne({ id });
  }

  @Get('current/cards')
  @ApiOkResponse({ type: CardDto, isArray: true })
  @PrivateAccess()
  async findCurrentUserCards(@Req() req: Request) {
    const payload = req['user'];

    if (!payload) {
      throw new UnauthorizedException();
    }

    const id = payload.sub;

    return this.usersService.findUserCards(id);
  }

  @Get('current/favorites')
  @ApiOkResponse({ type: CardDto, isArray: true })
  @PrivateAccess()
  async findCurrentUserFavorites(@Req() req: Request) {
    const payload = req['user'];

    if (!payload) {
      throw new UnauthorizedException();
    }

    const id = payload.sub;

    return this.usersService.findFavorites(id);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiConsumes('multipart/form-data')
  @RolesAccess('id', ['USER'])
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    const { roles } = req['user'];
    const isAdmin = roles?.includes('ADMIN');

    if(updateUserDto.skills) {
      updateUserDto.skills = JSON.parse(
        updateUserDto.skills as unknown as string
      );
    }

    if (updateUserDto.roles && isAdmin) {
      updateUserDto.roles = (updateUserDto.roles as unknown as string).split(',') as Role[];
    }
    

    if (file) {
      const basePath = this.utilsService.getBaseUrl(req);
      const avatar = `${basePath}/api/v1/${staticFolder}/${file.filename}`;
      await this.usersService.updateAvatar({ id }, avatar);
    }

    return this.usersService.update({ id }, updateUserDto, isAdmin);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted',
    example: { message: 'User deleted successful' },
  })
  async remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }

  @Get(':id/cards')
  @ApiOkResponse({ type: CardDto, isArray: true })
  async findUserCards(@Param('id') id: string) {
    return this.usersService.findUserCards(id);
  }

  @Get(':id/favorites')
  @ApiOkResponse({ type: CardDto, isArray: true })
  async findUserFavorites(@Param('id') id: string) {
    return this.usersService.findFavorites(id);
  }
}
