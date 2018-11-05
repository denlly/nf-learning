import { Test } from '@nestjs/testing';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dtos/create.feedback.dto';
import { AppModule } from '../app.module';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository, getRepository, ConnectionOptions } from 'typeorm';
import { FeedbackModule } from './feedback.module';
import { Feedback } from './feedback.entity';
import { fromCallback } from 'bluebird';
import 'reflect-metadata';

describe('FeedbackController', () => {
    let feedbackService: FeedbackService;
    const dto = Object.assign(new CreateFeedbackDto(), {
        dr: 1, // 声明是可以删除的测试数据
        userName: 'fanxiaodong',
        subject: 'I have a dream',
        email: 'fan91163@gmail.com',
        phone: '13800138000',
        content: '我爱工作，我爱学习，学习满足我的求知欲，工作满足我的成就感！',
    });
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([Feedback]),
                TypeOrmModule.forRoot({
                    type: config.get<string>('typeorm.type') as 'mysql',
                    host: config.get<string>('typeorm.host'),
                    port: config.get<number>('typeorm.port'),
                    username: config.get<string>('typeorm.username'),
                    password: config.get<string>('typeorm.password'),
                    database: config.get<string>('typeorm.database'),
                    entities: config.get<string[]>('typeorm.entities'),
                    subscribers: config.get<string[]>('typeorm.subscribers'),
                    synchronize: config.get<boolean>('typeorm.synchronize'),
                    logging: config.get<boolean>('typeorm.logging'),
                }),
            ],
            components: [FeedbackService],
        }).compile();
        feedbackService = module.get<FeedbackService>(FeedbackService);
    });

    afterAll(async () => {
        // todo: 测试完成，把测试数据删除
    });
    describe('create  ', async () => {
        it('should create suecess', async () => {
            const result = await feedbackService.create(dto);
            expect(result.id).toBeGreaterThan(0);
        });
    });
});
