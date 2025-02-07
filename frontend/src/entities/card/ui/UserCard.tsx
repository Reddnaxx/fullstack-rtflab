import Link from 'next/link';

import { TagsList } from '@/entities/tag/ui';
import { Button, IconButton, Icon, Text } from '@/shared/ui';
import { Card, CardHeader, CardContent, CardActions } from '@/shared/ui/Card';

import { UserCardActions } from './UserCardActions';
import { UserCardFavoriteButton } from './UserCardFavoriteButton';

import type { ICard } from '../models';
import type { FC } from 'react';

type CardProps = ICard & {
  variant?: 'raised' | 'flat';
};
type IUserCard = FC<CardProps> & { Loading: FC };

export const UserCard: IUserCard = ({
  id,
  title,
  team,
  author,
  skills,
  about,
  isOwner,
  status,
  isFavorite,
  variant = 'raised',
}) => {
  return (
    <Link href={'/card/' + id} className="group">
      <Card
        className="min-h-96 border-2 transition-all group-hover:border-black/20 group-hover:shadow-2xl"
        variant={variant}
      >
        <CardHeader className="flex-row justify-between">
          <div>
            <Text as="h3" size="20" weight="bold">
              {title}
            </Text>
            <Text as="p" size="14" className="mb-2">
              {team ? team.name : author.name.split(' ').slice(0, 2).join(' ')}
            </Text>
            <TagsList tags={skills} />
          </div>
          <UserCardFavoriteButton cardId={id} isFavorite={isFavorite} />
        </CardHeader>
        <CardContent>
          <Text>{about}</Text>
        </CardContent>
        <CardActions>
          <UserCardActions id={id} isOwner={isOwner} status={status} />
        </CardActions>
      </Card>
    </Link>
  );
};

const UserCardLoading: FC = () => {
  return (
    <Card>
      <CardHeader>
        <Text as="h3" weight="bold" size="20">
          Loading...
        </Text>
      </CardHeader>
      <CardContent>
        <div className="min-h-4 w-full rounded-md bg-gray-300" />
      </CardContent>
      <CardActions className="justify-between">
        <Button disabled>Loading...</Button>
        <IconButton variant="flat" disabled>
          <Icon name="favorite" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

UserCard.Loading = UserCardLoading;

export default UserCard;
