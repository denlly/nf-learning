import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { QueueModule } from '../queue/queue.module';

@Module({
    imports: [QueueModule],
    components: [MailService],
    exports: [MailService],
})
export class MailModule {}
