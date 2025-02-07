import { Button, Text } from '@/shared/ui';

export const NotFound = () => {
  return (
    <div className="flex h-[90vh] flex-col items-center justify-center gap-5">
      <Text as="h2" size="36" color="error" weight="bold">
        Ошибка 404
      </Text>
      <Text size="30" color="error" weight="bold">
        Страница не найдена
      </Text>
      <Button href="/" size="lg" variant="text" className="text-2xl">
        На главную
      </Button>
    </div>
  );
};

export default NotFound;
