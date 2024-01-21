import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './not-found-error/not-found-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //pipes
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  //filters
  app.useGlobalFilters(new NotFoundErrorFilter());

  //interceptors?
  //guards?
  //middlewares?

  await app.listen(3000);
}
bootstrap();

// TODO: create stock inputs 1:26:44
