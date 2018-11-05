import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as config from 'config';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as morgan from 'morgan';
import 'reflect-metadata';
import * as nuxtConfig from '../nuxt.config';
import { Env } from './common/constants/env';
import { SentryInterceptor } from './common/interceptors/sentry.interceptor';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import getEnv from './common/tools/env';
import { AppModule } from './modules/app.module';

const logger = new Logger('Bootstrap');

// tslint:disable-next-line:no-var-requires
const { Builder, Nuxt } = require('nuxt');

async function bootstrap() {
    const env = getEnv();
    logger.log('env:' + env);

    // nuxt setup
    const nuxt = await new Nuxt(nuxtConfig);
    // Build only in dev mode
    if (nuxtConfig.dev) {
        new Builder(nuxt).build();
    }

    const basePath = config.get<string>('basePath');

    // nestjs setup
    const server = express();
    const app = await NestFactory.create(AppModule, server, {
        cors: true,
    });
    app.setGlobalPrefix(basePath);
    // 生产环境和预备环境 启动sentry，自动记录未处理异常
    if (env === Env.PRODUCTION || env === Env.STAGING) {
        app.useGlobalInterceptors(new SentryInterceptor());
    }
    app.useGlobalPipes(new CustomValidationPipe());
    // 启动cookie插件
    app.use(cookieParser());
    // 配置最高压缩级别
    app.use(compression(9));
    // Add various HTTP headers to secure the app
    app.use(helmet());
    // 允许growingio的iframe加载，用于growingio的圈选功能
    app.use(
        helmet.frameguard({
            action: 'allow-from',
            domain: 'https://www.growingio.com',
        }),
    );
    app.use(morgan('dev'));
    app.use(
        require('express-naked-redirect')({
            reverse: true,
        }),
    );

    // 非生产环境才加载swagger
    // config配置文件里配置启动了swagger才加载模块
    if (config.get<boolean>('swagger.enable')) {
        // swagger setup
        const packageBody = require('../package.json');
        const options = new DocumentBuilder()
            .setTitle(packageBody.name)
            .setDescription(packageBody.description)
            .setVersion(packageBody.version)
            .setSchemes('http')
            .addBearerAuth('Authorization', 'header')
            .setBasePath(basePath)
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('/docs', app, document);
        logger.log('Swagger dependencies initialized');
    }

    await app.init();

    const httpPort = config.get<number>('httpPort');
    let host = config.get<string>('host');

    // 监听80
    http.createServer(server).listen(httpPort, host, () => {
        logger.log(`Application is listening on http://${host}:${httpPort}`);
    });

    // mount nuxt render
    app.use(nuxt.render);
}

bootstrap();
