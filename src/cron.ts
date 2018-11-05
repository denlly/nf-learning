import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import getEnv from './common/tools/env';
import { Env } from './common/constants/env';
import { AppCronModule } from './modules/app.cron.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
    const env = getEnv();
    logger.log('env:' + env);

    const app = await NestFactory.create(AppCronModule);
}

bootstrap();
