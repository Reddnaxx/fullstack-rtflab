import { Injectable, NotFoundException } from '@nestjs/common';
import { $Enums, Prisma } from '@prisma/client';

import { PrismaService } from '@app/prisma';

import { CardCreateDto } from './dto';

@Injectable()
export class CardsService {
  private readonly cardInclude: Prisma.CardInclude = {
    author: {
      omit: {
        createdAt: true,
        updatedAt: true,
        email: true,
        password: true,
        roles: true,
      },
    },
    team: {
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    },
  };
  private readonly cardOmit: Prisma.CardOmit = {
    authorId: true,
    teamId: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(private readonly prisma: PrismaService) {}

  async create(data: CardCreateDto) {
    const { authorId, teamId } = data;

    const author = await this.prisma.user.findUnique({
      where: { id: authorId },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${authorId} not found`);
    }

    const team =
      teamId && (await this.prisma.team.findUnique({ where: { id: teamId } }));
    if (teamId && !team) {
      throw new NotFoundException(`Team with id ${teamId} not found`);
    }

    return this.prisma.card.create({
      data: data as Prisma.CardUncheckedCreateInput,
      omit: this.cardOmit,
      include: this.cardInclude,
    });
  }

  async findAll(
    take: number = 10,
    skip: number = 0,
    where?: Prisma.CardWhereInput,
    userId?: string
  ) {
    const cards = await this.prisma.card.findMany({
      omit: this.cardOmit,
      include: this.cardInclude,
      take,
      skip,
      where: { status: $Enums.Status.ACTIVE, ...where },
    });

    if (userId) {
      const favorites = await this.prisma.userFavorites.findMany({
        where: { userId },
      });

      return cards.map(card => ({
        ...card,
        isFavorite: !!favorites.find(fav => fav.cardId === card.id),
      }));
    }

    return cards;
  }

  async findOne(where: Prisma.CardWhereUniqueInput, userId?: string) {
    const card = await this.prisma.card.findUnique({
      where,
      omit: this.cardOmit,
      include: this.cardInclude,
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (userId) {
      const favorites = await this.prisma.userFavorites.findMany({
        where: { cardId: card.id, userId },
      });

      return { ...card, isFavorite: !!favorites.length };
    }

    return { ...card, isFavorite: false };
  }

  async update(
    where: Prisma.CardWhereUniqueInput,
    data: Prisma.CardUncheckedUpdateInput
  ) {
    try {
      const card = await this.prisma.card.update({
        where,
        data,
        omit: this.cardOmit,
        include: this.cardInclude,
      });
      return card;
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Card not found');
      }
      throw e;
    }
  }

  async delete(where: Prisma.CardWhereUniqueInput) {
    try {
      await this.prisma.card.delete({
        where,
        omit: this.cardOmit,
        include: this.cardInclude,
      });

      return { message: 'Card successfully deleted' };
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Card not found');
      }
      throw e;
    }
  }

  async deactivate(where: Prisma.CardWhereUniqueInput) {
    try {
      await this.prisma.card.update({
        where,
        data: { status: $Enums.Status.INACTIVE },
        omit: this.cardOmit,
        include: this.cardInclude,
      });

      return { message: 'Card successfully deactivated' };
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Card not found');
      }
      throw e;
    }
  }

  async activate(where: Prisma.CardWhereUniqueInput) {
    try {
      await this.prisma.card.update({
        where,
        data: { status: $Enums.Status.ACTIVE },
        omit: this.cardOmit,
        include: this.cardInclude,
      });

      return { message: 'Card successfully activated' };
    } catch (e) {
      if (e.code === 'P2025') {
        throw new NotFoundException('Card not found');
      }
      throw e;
    }
  }

  async favorite(userId: string, where: Prisma.CardWhereUniqueInput) {
    const card = await this.prisma.card.findUnique({
      where,
      omit: this.cardOmit,
      include: this.cardInclude,
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    await this.prisma.userFavorites.create({
      data: {
        userId: userId,
        cardId: card.id,
      },
    });

    return { message: 'Card successfully favorited' };
  }

  async unfavorite(userId: string, where: Prisma.CardWhereUniqueInput) {
    const card = await this.prisma.card.findUnique({
      where,
      omit: this.cardOmit,
      include: this.cardInclude,
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    await this.prisma.userFavorites.deleteMany({
      where: {
        userId,
        cardId: card.id,
      },
    });

    return { message: 'Card successfully unfavorited' };
  }
}
