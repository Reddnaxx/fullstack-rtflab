import { join } from 'path';

import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { staticFolder, swaggerConfig, v1Prefix } from './configs';
import { AuthService } from './resources/auth/auth.service';
import { AuthGuard, RolesGuard } from './resources/auth/guards';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix(v1Prefix);

  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:6006'],
  });
  app.useStaticAssets(join(__dirname, '..', staticFolder), {
    prefix: `/${staticFolder}/`,
  });

  const authService = app.get(AuthService);
  const jwtService = app.get(JwtService);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(
    new AuthGuard(jwtService, authService, reflector),
    new RolesGuard(reflector)
  );

  SwaggerModule.setup(`${v1Prefix}/docs`, app, () =>
    SwaggerModule.createDocument(app, swaggerConfig)
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
