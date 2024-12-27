import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle('RTFLab API')
    .setDescription('RTFLab API for UrFU project')
    .setVersion('1.0')
    .addServer('http://localhost:8000', 'Local environment')
    .addCookieAuth('access-token')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port')!;

  await app.listen(port);
}
bootstrap();
