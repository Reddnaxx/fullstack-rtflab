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
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { QueryListAllEntities } from 'src/shared/dto/query';

import { UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';
import { PrivateAccess, RolesAccess } from '../auth/decorators';
import { AdminAccess } from '../auth/decorators/admin.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserDto] })
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

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  @RolesAccess('USER')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request
  ) {
    const { roles } = req['user'];
    const isAdmin = roles?.includes('ADMIN');

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
}
