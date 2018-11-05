import { Module, MiddlewaresConsumer, RequestMethod, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { authenticate } from 'passport';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { QueueModule } from './queue/queue.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: config.get<string>('typeorm.type') as 'postgres',
            host: config.get<string>('typeorm.host'),
            port: config.get<number>('typeorm.port'),
            username: config.get<string>('typeorm.username'),
            password: config.get<string>('typeorm.password'),
            database: config.get<string>('typeorm.database'),
            entities: config.get<string[]>('typeorm.entities'),
            subscribers: config.get<string[]>('typeorm.subscribers'),
            synchronize: config.get<boolean>('typeorm.synchronize'),
            logging: config.get<boolean>('typeorm.logging'),
        }),
        RedisModule,
        QueueModule,
        AuthModule,
        UserModule,
        FeedbackModule,
        CommonModule,
    ],
    components: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {}
}
