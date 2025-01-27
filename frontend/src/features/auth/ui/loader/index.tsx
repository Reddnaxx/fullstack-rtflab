import { Logo, Text } from '@/shared/ui';

export const AuthLoaderUI = () => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-white">
      <Logo />
      <Text as="h2" weight="normal" size="24">
        Выполняется вход...
      </Text>
    </div>
  );
};

export default AuthLoaderUI;
