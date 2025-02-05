import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { CardsService } from './cards.service';
import { CardCreateDto, CardDto, CardUpdateDto } from './dto';
import { CardType } from './types';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { PrivateAccess, RolesAccess, WithUser } from '../auth/decorators';
import { AdminAccess } from '../auth/decorators/admin.decorator';
import { CardsItemResponseDto } from './dto/response';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('')
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'withInactive', required: false })
  @ApiOkResponse({ type: CardsItemResponseDto, isArray: true })
  @WithUser()
  async findAll(
    @Req() req: Request,
    @Query('type') type?: CardType,
    @Query('withInactive') withInactive?: boolean
  ) {
    const payload = req['user'];
    const where = {
      ...(type === 'vacancy' && { NOT: { teamId: null } }),
      ...(withInactive ? {} : { status: $Enums.Status.ACTIVE }),
    };
    const cards = await this.cardsService.findAll(10, 0, where);

    return cards.map(card => ({
      ...card,
      isOwner: payload ? card.author.id === payload.sub : false,
      isFavorite: false,
    }));
  }

  @Post('')
  @PrivateAccess()
  @ApiOkResponse({ type: CardDto })
  async create(@Body() data: CardCreateDto, @Req() req: Request) {
    const payload = req['user'];

    if (!payload) {
      throw new UnauthorizedException();
    }

    const authorId = payload.sub;

    return this.cardsService.create({ ...data, authorId });
  }

  @Get(':id')
  @ApiOkResponse({ type: CardDto })
  async findOne(@Param('id') id: string) {
    return this.cardsService.findOne({ id });
  }

  @Patch(':id')
  @RolesAccess('authorId', ['USER'])
  @ApiOkResponse({ type: CardDto })
  async update(
    @Param('id') id: string,
    @Body() data: CardUpdateDto,
    @Req() req: Request
  ) {
    const payload = req['user'];

    if (!payload) {
      throw new UnauthorizedException();
    }

    const authorId = payload.sub;

    return this.cardsService.update({ id }, { ...data, authorId });
  }

  @Delete(':id')
  @ApiOkResponse({ example: { message: 'Card successfully deleted' } })
  @AdminAccess()
  async delete(@Param('id') id: string) {
    return this.cardsService.delete({ id });
  }

  @Post(':id/deactivate')
  @RolesAccess('authorId', ['USER'])
  async deactivate(@Param('id') id: string) {
    return this.cardsService.deactivate({ id });
  }

  @Post(':id/activate')
  @RolesAccess('authorId', ['USER'])
  async activate(@Param('id') id: string) {
    return this.cardsService.activate({ id });
  }
}
