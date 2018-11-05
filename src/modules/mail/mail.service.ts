import { Component, Inject, BadRequestException, ConflictException } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import * as config from 'config';
import * as mailService from '@sendgrid/mail';
import { MailData } from '@sendgrid/helpers/classes/mail';
import { User } from '../user/user.entity';
import { CustomLoggerService } from '../../common/services/custom-logger.service';

import { SendEmailMessage } from '../queue/messages/send-email.message';
import { SendEmailQueue } from '../queue/queues/send-email.queue';
import { getManager } from 'typeorm';
import { ErrorCode } from '../../common/constants/error-code';

@Component()
export class MailService {
    private readonly logger = new CustomLoggerService('MailService');
    private readonly mail = mailService;

    constructor(private readonly sendEmailQueue: SendEmailQueue) {
        this.mail.setApiKey(config.get<string>('email.sendgrid.apiKey'));
        this.mail.setSubstitutionWrappers('{{', '}}');
    }

    public async sendEmailToConsumer(mail: MailData) {}
}
