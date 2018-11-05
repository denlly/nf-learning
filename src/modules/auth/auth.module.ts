import * as passport from 'passport';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod, forwardRef } from '@nestjs/common';

import { JwtStrategy } from './passports/jwt.strategy';
import { CQRSModule, CommandBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { User } from '../user/user.entity';

import { UserModule } from '../user/user.module';
import { MailModule } from '../mail/mail.module';
import { RedisModule } from '../redis/redis.module';
import { QueueModule } from '../queue/queue.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        RedisModule,
        QueueModule,
        forwardRef(() => UserModule),
        CQRSModule,
        MailModule,
    ],
    controllers: [AuthController],
    components: [AuthService, JwtStrategy, ...CommandHandlers],
    exports: [AuthService],
})
export class AuthModule implements NestModule {
    constructor(private readonly moduleRef: ModuleRef, private readonly command$: CommandBus) {}

    onModuleInit() {
        this.command$.setModuleRef(this.moduleRef);
        this.command$.register(CommandHandlers);
    }

    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/auth/resend*', method: RequestMethod.ALL },
                { path: '/user', method: RequestMethod.ALL },
                { path: '/user/*', method: RequestMethod.ALL },
                { path: '/users', method: RequestMethod.ALL },
                { path: '/users/*', method: RequestMethod.ALL },
                { path: '/contract/*', method: RequestMethod.ALL },
                { path: '/wallet/*', method: RequestMethod.ALL },
                { path: '/invitation/create', method: RequestMethod.ALL },
                { path: '/invitation/discount', method: RequestMethod.ALL },
                { path: '/invitation/bind', method: RequestMethod.ALL },
                { path: '/invitation/statistics/*', method: RequestMethod.ALL },
                { path: '/profit/*', method: RequestMethod.ALL },
                { path: '/prepopularize/calculatorprofit/*', method: RequestMethod.ALL },
                { path: '/payment/paycoin', method: RequestMethod.ALL },
                { path: '/payment/findPayFromCoinPlatform', method: RequestMethod.ALL },
                { path: '/payment/list', method: RequestMethod.ALL },
                { path: '/admin/*', method: RequestMethod.ALL },
                { path: '/inform/*', method: RequestMethod.ALL },
                { path: '/audit/*', method: RequestMethod.ALL },
                { path: '/google2step/*', method: RequestMethod.ALL },
                { path: '/deploy/*', method: RequestMethod.ALL },
                { path: '/dashboard/*', method: RequestMethod.ALL },
            );
    }
}
