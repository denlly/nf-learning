import { RoleType } from '../../common/constants/role-type';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import {
    ApiBearerAuth,
    ApiUseTags,
    ApiResponse,
    ApiOperation,
    ApiImplicitQuery,
    ApiImplicitBody,
} from '@nestjs/swagger';
import {
    Controller,
    Post,
    HttpStatus,
    HttpCode,
    Get,
    Body,
    Req,
    UseInterceptors,
    Param,
    NotFoundException,
    UseGuards,
    Request,
    BadRequestException,
    Logger,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { ErrorCode } from '../../common/constants/error-code';
import { HttpException } from '@nestjs/core';
import { CustomLoggerService } from '../../common/services/custom-logger.service';
import { CreateFeedbackDto } from './dtos/create.feedback.dto';
const logger = new Logger('FeedbackController');
// @ApiBearerAuth()
@ApiUseTags('feedback')
// @UseGuards(RolesGuard)
@Controller('feedback')
export class FeedbackController {
    private readonly logger = new CustomLoggerService('FeedbackService');

    constructor(private readonly feedbackService: FeedbackService) {}

    @ApiOperation({ title: '提交Feedback' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Object,
        isArray: true,
        description: '成功创建',
    })
    @Post('create')
    public async create(@Body() dto: CreateFeedbackDto) {
        logger.log('called feedback/create');
        const result = await this.feedbackService.create(dto);
        return { id: result.id };
    }

    @ApiOperation({ title: '提交Feedback' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        isArray: true,
        description: '获取成功',
    })
    @Get()
    public async list() {
        return { msg: 'get feedback list' };
    }
}
