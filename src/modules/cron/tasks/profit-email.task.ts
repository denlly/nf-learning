import { Component } from '@nestjs/common';
import { Task } from '../../../common/cron/task';
import { getManager } from 'typeorm';

import { ContractStatus } from '../../contract/contract.entity';
import { Invitation } from '../../invitation/invitation.entity';
import { User } from '../../user/user.entity';

import { ProfitService } from '../../profit/profit.service';
import { WalletService } from '../../wallet/wallet.service';
import { MailService } from '../../mail/mail.service';
import { Coin } from '../../wallet/entity/wallet.entity';

const moment = require('moment');

@Component()
export class ProfitEmailTask extends Task {
    constructor(
        private readonly walletService: WalletService,
        private readonly profitService: ProfitService,
        private readonly mailService: MailService,
    ) {
        // 每周一12:30分执行
        super('0 30 17 * * 2');
    }

    async handle() {
        // 除正式环境外不自动发送收益邮件
        if (process.env.NODE_ENV !== 'production') {
            return;
        }

        const blockedUserIDs = [777, 4812, 12897, 42040, 42867];
        const blockedInvitationCodes = [];

        for (const blockedUserID of blockedUserIDs) {
            const invitation = await getManager().findOne(Invitation, { where: { user: blockedUserID } });
            blockedInvitationCodes.push(invitation.invitationCode);
        }

        const users = await getManager()
            .createQueryBuilder(User, 'user')
            .select('user.id')
            .addSelect('user.email')
            .leftJoin(Invitation, 'invitation', 'user.id = invitation.user')
            .innerJoin('user.contracts', 'contract', 'contract.status = :status', {
                status: ContractStatus.Activated,
            })
            .where('invitation.bindInvitationCode NOT IN (:invitationCode)', {
                invitationCode: blockedInvitationCodes,
            })
            .getMany();

        for (const user of users) {
            const profit = await this.profitService.getDaysProfitByUser(user.id, Coin.BTC, 7);
            const blance = await this.walletService.getWalletBalanceUSD(user.id);

            let totalBTC = 0;

            if (profit.profits) {
                for (const day of profit.profits) {
                    totalBTC += Number(day.profit);
                }
            }

            const data = {
                BTCprofit: (totalBTC / 1e8).toFixed(8) + ' ' + Coin.BTC,
                ETHprofit: 0,
                LTCprofit: 0,
                DASHprofit: 0,
                XMRprofit: 0,
                ZECprofit: 0,
                Balance: blance.totalBalance,
            };

            await this.mailService.sendEmailToConsumer(this.mailService.weeklyMiningEmail(user, data));
        }
    }
}
