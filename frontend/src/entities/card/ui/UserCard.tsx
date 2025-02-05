import { TagsList } from '@/entities/tag/ui';
import { Button, IconButton, Icon, Text } from '@/shared/ui';
import { Card, CardHeader, CardContent, CardActions } from '@/shared/ui/Card';

import { CardStatus } from '../models';

import type { ICard } from '../models';
import type { FC } from 'react';

type IUserCard = FC<CardProps> & { Loading: FC };

type CardProps = ICard;

export const UserCard: IUserCard = ({
  title,
  team,
  author,
  skills,
  about,
  isOwner,
  status,
}) => {
  return (
    <Card className="min-h-96">
      <CardHeader className="flex-row justify-between">
        <div>
          <Text as="h3" weight="bold" size="20">
            {title}
          </Text>
          <Text as="p" size="14" className="mb-2">
            {team ? team.name : author.name.split(' ').slice(0, 2).join(' ')}
          </Text>
          <TagsList tags={skills} />
        </div>
        <IconButton variant="flat">
          <Icon name="favorite" />
        </IconButton>
      </CardHeader>
      <CardContent>
        <Text>{about}</Text>
      </CardContent>
      <CardActions>
        {isOwner ? (
          <>
            <Button>Изменить</Button>
            {status === CardStatus.ACTIVE ? (
              <Button color="danger">В архив</Button>
            ) : (
              <Button color="success">Вернуть из архива</Button>
            )}
          </>
        ) : (
          <Button>Откликнуться</Button>
        )}
      </CardActions>
    </Card>
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
