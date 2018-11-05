import { Component, Inject } from '@nestjs/common';
import { Queue, AmqpQueue, AmqpClient } from 'coconspirators';
import { SendEmailMessage } from '../messages/send-email.message';

@Component()
@Queue({
    name: 'send.email',
    contentType: 'application/json',
    durable: true,
    noAck: false,
    channel: { prefetch: 1 },
})
export class SendEmailQueue extends AmqpQueue<SendEmailMessage> {
    constructor(@Inject('AmqpClientToken') client: AmqpClient) {
        super(client);
    }
}
