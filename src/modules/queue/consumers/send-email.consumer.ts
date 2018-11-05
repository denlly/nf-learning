import { Component } from '@nestjs/common';
import { SendEmailQueue } from '../queues/send-email.queue';
import { MailService } from '../../mail/mail.service';
import { MailData } from '@sendgrid/helpers/classes/mail';

import * as config from 'config';
import * as mailService from '@sendgrid/mail';

@Component()
export class SendEmailConsumer {
    private readonly mail = mailService;
    constructor(private readonly queue: SendEmailQueue) {
        this.mail.setApiKey(config.get<string>('email.sendgrid.apiKey'));
        this.mail.setSubstitutionWrappers('{{', '}}');

        this.queue.subscribe(async message => {
            const mail = message.body.mail as MailData;
            await this.mail.send(mail);
            console.log('send grid' + mail.to);
            message.ack();
        });
    }
}
