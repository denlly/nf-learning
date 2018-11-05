import { Component, Inject, BadRequestException } from '@nestjs/common';
import { Task } from '../../../common/cron/task';

import { getManager } from 'typeorm';
import { User } from '../../user/user.entity';

import { CalculatorProfitContractQueue } from '../../queue/queues/calculator-profit-contract.queue';
import { CalculatorProfitContractMessage } from '../../queue/messages/calculator-profit-contract.message';

@Component()
export class ContractRevenueTask extends Task {
    constructor(private readonly calculatorProfitContractQueue: CalculatorProfitContractQueue) {
        // 每天12:15执行
        super('0 15 12 * * *');
    }

    async handle() {
        try {
        } catch (error) {
            console.log(error);
        }
    }
}
