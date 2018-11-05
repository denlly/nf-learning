import * as config from 'config';
import * as retry from 'retry';
import { AmqpClient } from 'coconspirators';
import { CustomLoggerService } from '../../common/services/custom-logger.service';

import { Repository, getManager, getRepository, FindManyOptions, EntityManager } from 'typeorm';
const logger = new CustomLoggerService('queueProviders');

export const queueProviders = [
    {
        provide: 'AmqpClientToken',
        useFactory: async () => {
            const client = new AmqpClient();
            // 如果没有配置 rabbbitmq
            if (!config.get<string>('rabbitmq.url')) {
                return client;
            }
            client.on('connected', async () => {
                logger.info('RabbitMQ connected!');
            });

            // rabbitmq断线重连机制
            client.on('disconnected', async () => {
                logger.info('RabbitMQ disconnected!');
                if (!config.get<string>('rabbitmq.url')) {
                    return;
                }
                const operation = retry.operation({ forever: true });
                operation.attempt(async attempt => {
                    logger.info(`RabbitMQ attempt ${attempt} reconnect.`);
                    try {
                        await client.connect(config.get<string>('rabbitmq.url'));

                        return;
                    } catch (e) {
                        if (operation.retry(e)) return;

                        throw e;
                    }
                });
            });

            await client.connect(config.get<string>('rabbitmq.url'));

            return client;
        },
    },
];
