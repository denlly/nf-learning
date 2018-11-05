import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';

import { MailModule } from '../mail/mail.module';

@Module({
    imports: [],
    components: [],
    controllers: [CommonController],
    exports: [],
})
export class CommonModule {}
