import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';
import { CronModule } from './cron/cron.module';

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
        CronModule,
    ],
    components: [],
})
export class AppCronModule {}
