import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './utils/http-exception.filter';

const mainLogger = new Logger('Main');

async function bootstrap() {
  /**
   * Load environment variables (.env)
   * @see .env.example - file on root folder for configurations
   */
  config();

  const app = await NestFactory.create(AppModule);
  /** Configure app instance */
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3002'],
  });
  app.use(cookieParser());
  app.setGlobalPrefix(process.env.APP_ROOT);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  /** Run app instance on a port */
  await app.listen(process.env.APP_PORT, () => {
    mainLogger.log(
      `${process.env.NODE_ENV}: api running on "PORT" ${process.env.APP_PORT} with "PATH" ${process.env.APP_ROOT}`,
    );
  });
}
bootstrap();
