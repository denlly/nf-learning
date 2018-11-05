import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';

import { QueueModule } from './queue.module';
import { MailModule } from '../mail/mail.module';
import { SendEmailConsumer } from './consumers/send-email.consumer';

@Module({
    imports: [TypeOrmModule.forFeature([User]), QueueModule, MailModule],
    components: [SendEmailConsumer],
})
export class ConsumerModule {}
