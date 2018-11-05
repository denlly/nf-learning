import { Component, Inject, BadRequestException, ConflictException, mixin } from '@nestjs/common';
import * as moment from 'moment';
import * as config from 'config';
import { createHandyClient } from 'handy-redis';
import { ClientOpts } from 'redis';
import { CustomLoggerService } from '../../common/services/custom-logger.service';

@Component()
export class RedisService {
    private readonly logger = new CustomLoggerService('RedisService');

    public readonly client = createHandyClient(config.get<string>('redis') as ClientOpts);

    constructor() {}
}
