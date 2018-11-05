import { Component, Inject, BadRequestException } from '@nestjs/common';
import { Task } from '../../../common/cron/task';

import { getManager } from 'typeorm';

import { ProfitService } from '../../profit/profit.service';
import { MailService } from '../../mail/mail.service';
import { User } from '../../user/user.entity';

@Component()
export class ProductRevenueTask extends Task {
    constructor(private readonly profitService: ProfitService, private readonly mailService: MailService) {
        // 每天12:00执行
        super('0 0 12 * * *');
    }

    async handle() {
        try {
            await getManager().transaction(async manager => {
                await this.profitService.calculatorRevenueProducts(manager);
            });
        } catch (error) {
            const users = await getManager()
                .createQueryBuilder(User, 'user')
                .where('user.roles LIKE :role', { role: '%admin%' })
                .getMany();

            users.forEach(element => {
                this.mailService.sendEmailToConsumer(this.mailService.errorEmail(element, '获取收益失败'));
            });

            console.log(error);
        }
    }
}
