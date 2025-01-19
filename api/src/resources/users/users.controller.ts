import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { QueryListAllEntities } from 'src/shared/dto/query';

import { UpdateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserDto] })
  async findAll(@Query() query: QueryListAllEntities) {
    return this.usersService.findAll(+query.take, +query.skip);
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ id }, updateUserDto);
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
