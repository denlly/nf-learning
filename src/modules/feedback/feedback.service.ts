import { Component, Inject, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import { CustomLoggerService } from '../../common/services/custom-logger.service';
import { CreateFeedbackDto } from './dtos/create.feedback.dto';
import { Feedback } from './feedback.entity';
import * as config from 'config';
import axios from 'axios';
@Component()
export class FeedbackService {
    private readonly loggerService = new CustomLoggerService('FeedbackService');

    constructor(@InjectRepository(Feedback) private readonly feedbackRepository: Repository<Feedback>) {}

    async create(dto: CreateFeedbackDto): Promise<Feedback> {
        const entity = Object.assign(new Feedback(), dto);
        return this.feedbackRepository.save<Feedback>(entity);
    }
    async pagedList() {}
}
