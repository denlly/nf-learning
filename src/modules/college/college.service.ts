import { Component, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CustomLoggerService } from '../../common/services/custom-logger.service';
import { CreateCollegeDto } from './dtos/create.college.dto';
import { UpdateCollegeDto } from './dtos/update.college.dto';
import { BaseDto } from '../../common/base/base_dto';
import { College } from './college.entity';
import * as config from 'config';
import axios from 'axios';
import { PagedListDto } from '../../common/base/paged_list_dto';
@Component()
export class CollegeService {
    private readonly loggerService = new CustomLoggerService('CollegeService');

    constructor(@InjectRepository(College) private readonly collegeRepository: Repository<College>) {}

    public async create(dto: CreateCollegeDto): Promise<College> {
        const entity = Object.assign(new College(), dto);
        return this.collegeRepository.save<College>(entity);
    }

    public async update(dto: UpdateCollegeDto, req): Promise<College> {
        const entity = Object.assign(new College(), dto);
        entity.updatedAt = req.user.id;
        return this.collegeRepository.save<College>(entity);
    }

    public async findById(id: number): Promise<College | undefined> {
        return this.collegeRepository.findOneById(id);
    }

    public async listAll(dto: BaseDto): Promise<College[] | undefined> {
        return this.collegeRepository.find({
            where: { dr: dto.dr },
            dr: dto.dr,
            order: { orderIndex: 'asc' },
        });
    }

    public async pagedList(dto: PagedListDto): Promise<any> {
        return this.collegeRepository.findAndCount({
            where: {
                dr: dto.dr,
            },
            skip: dto.skip,
            take: dto.limit,
        });
    }

    public async delete(id: number): Promise<void> {
        // 判断关联关系，如果没有关联可以物理删除
        return this.collegeRepository.removeById(id);
    }
}
