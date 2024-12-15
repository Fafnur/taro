import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';

import { formExceptionFactory } from '@taro/backend/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: formExceptionFactory,
    }),
  );

  const corsOptions = await configService.get('cors');
  app.enableCors(corsOptions);

  const globalPrefix = await configService.get('prefix');

  app.setGlobalPrefix(globalPrefix);
  const port = configService.get('port');
  await app.listen(port);

  Logger.log(`Listening at http://localhost:${port}${globalPrefix ? '/' + globalPrefix : ''}`);
}

void bootstrap();
