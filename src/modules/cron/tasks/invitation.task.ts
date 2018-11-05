import { Component } from '@nestjs/common';
import { Task } from '../../../common/cron/task';
import { CustomLoggerService } from '../../../common/services/custom-logger.service';
import { ProfitService } from '../../profit/profit.service';
import { getManager } from 'typeorm';
import { BrokerageService } from '../../profit/brokerage.service';

/**
 * 推广[佣金计算]&[定级]任务
 */
@Component()
export class InvitationTask extends Task {
    constructor(private readonly brokerageService: BrokerageService) {
        // 每天12:00执行
        //super('0 0 0/1 * * *');
        super('0 40 * * * *');
    }

    private readonly logger = new CustomLoggerService('InvitationTask');

    async handle() {
        try {
            this.logger.info('$$$$$$$$$$$$$$$$$ INVITATION TASK START $$$$$$$$$$$$$$$$$');
            // 计算推广数据并进行定级
            await getManager().transaction(async manager => {
                await this.brokerageService.calculateInvitation(manager);
            });
            this.logger.info('$$$$$$$$$$$$$$$$$ INVITATION TASK COMPLETED $$$$$$$$$$$$$$$$$');
        } catch (error) {
            this.logger.error('**************** ERROR START ****************');
            this.logger.error('推广定级&佣金分配任务运行异常...');
            console.log(error);
            this.logger.error('**************** ERROR END ****************');
        }
    }
}
