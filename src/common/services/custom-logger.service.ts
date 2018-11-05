import * as winston from 'winston';
// tslint:disable-next-line
require('winston-papertrail').Papertrail;
import { Component } from '@nestjs/common';
import * as moment from 'moment';

@Component()
export class CustomLoggerService {
    private logger;

    /**
     * Creates an instance of CustomLoggerService.
     * @param {string} [label=''] logger标签前缀
     * @memberof CustomLoggerService
     */
    constructor(private label = '') {
        const now = () => moment().format('YYYY-M-D HH:mm:ss');

        this.logger = new winston.Logger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    json: false,
                    colorize: true,
                    formatter: options => `[${options.level.toUpperCase()}] - ${now()}  [${label}] ${options.message}`,
                }),
            ],
        });
    }

    public verbose(message: any, ...meta: any[]) {
        this.logger.verbose(message, ...meta);
    }

    public debug(message: any, ...meta: any[]) {
        this.logger.debug(message, ...meta);
    }

    public log(message: any, ...meta: any[]) {
        this.logger.info(message, ...meta);
    }

    public info(message: any, ...meta: any[]) {
        this.logger.info(message, ...meta);
    }

    public warn(message: any, ...meta: any[]) {
        this.logger.warn(message, ...meta);
    }

    public error(message: any, ...meta: any[]) {
        this.logger.error(message, ...meta);
    }
}
