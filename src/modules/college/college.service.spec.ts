import { Test } from '@nestjs/testing';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { CreateCollegeDto } from './dtos/create.college.dto';
import { AppModule } from '../app.module';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository, getRepository, ConnectionOptions } from 'typeorm';
import { CollegeModule } from './college.module';
import { College } from './college.entity';
import { fromCallback } from 'bluebird';
import 'reflect-metadata';
import { PagedListDto } from '../../common/base/paged_list_dto';

describe('collegeController', () => {
    let collegeService: CollegeService;
    let _CurrentID = 0;
    const dto = Object.assign(new CreateCollegeDto(), {
        dr: 1, // 声明是可以删除的测试数据
        name: 'DataFountain学院',
        shortName: 'DF学院',
        universityName: '中国科学大学',
    });

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([College]),
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
            components: [CollegeService],
        }).compile();
        collegeService = module.get<CollegeService>(CollegeService);
    });

    afterAll(async () => {
        // todo: 测试完成，把测试数据删除
    });
    describe('Test create  ', async () => {
        it('should create suceess', async () => {
            const result = await collegeService.create(dto);
            _CurrentID = result.id;
            expect(result.id).toBeGreaterThan(0);
        });
        // tip: 这里可以完成一些本方法的其他边界，特殊值，异常测试的用例
    });

    describe('Test findById', async () => {
        it('get a college in suceess', async () => {
            const result = await collegeService.findById(_CurrentID);
            expect(result).not.toBeUndefined();
            expect(result).not.toBeNull();
        });
    });

    describe('Test listAll', async () => {
        it('get college listAll in suceess', async () => {
            const result = await collegeService.listAll({ dr: true });
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveProperty('length');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('Test pagedList', async () => {
        it('get college pagedList in suceess', async () => {
            const pagedList: PagedListDto = { dr: true, skip: 0, limit: 10 };
            const result = await collegeService.pagedList(pagedList);
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveProperty('length');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    describe('Test delete', async () => {
        it('get delete mothod in suceess', async () => {
            // const pagedList: PagedListDto = { dr: true, skip: 0, limit: 10 };
            const result = collegeService.delete(_CurrentID);
            result.then(() => {
                expect(1).toBe(1);
            });
        });
    });
});
