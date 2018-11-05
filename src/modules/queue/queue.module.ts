import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { queueProviders } from './queue.providers';

import { SendEmailQueue } from './queues/send-email.queue';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    components: [SendEmailQueue, ...queueProviders],
    exports: [SendEmailQueue],
})
export class QueueModule {}
