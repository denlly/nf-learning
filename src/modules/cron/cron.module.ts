import { Module } from '@nestjs/common';
import { ProfitEmailTask } from './tasks/profit-email.task';
import { ProductRevenueTask } from './tasks/product-revenue.task';
import { ContractRevenueTask } from './tasks/contract-revenue.task';
import { InvitationTask } from './tasks/invitation.task';

import { InvitationModule } from '../invitation/invitation.module';
import { ProfitModule } from '../profit/profit.module';
import { QueueModule } from '../queue/queue.module';
import { MailModule } from '../mail/mail.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
    imports: [QueueModule, ProfitModule, InvitationModule, MailModule, WalletModule],
    components: [ProfitEmailTask, ProductRevenueTask, ContractRevenueTask, InvitationTask],
})
export class CronModule {}
