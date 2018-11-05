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
    Delete,
    Body,
    Req,
    UseInterceptors,
    Param,
    NotFoundException,
    UseGuards,
    Request,
    BadRequestException,
    Logger,
    Query,
    Put,
} from '@nestjs/common';
import { CollegeService } from './college.service';
import { ErrorCode } from '../../common/constants/error-code';
import { HttpException } from '@nestjs/core';
import { CustomLoggerService } from '../../common/services/custom-logger.service';
import { CreateCollegeDto } from './dtos/create.college.dto';
import { UpdateCollegeDto } from './dtos/update.college.dto';
import { BaseDto } from '../../common/base/base_dto';
import { PagedListDto } from '../../common/base/paged_list_dto';
const logger = new Logger('CollegeController');
// @ApiBearerAuth()
@ApiUseTags('College')
// @UseGuards(RolesGuard)
@Controller('College')
export class CollegeController {
    private readonly logger = new CustomLoggerService('CollegeService');

    constructor(private readonly CollegeService: CollegeService) {}

    @ApiOperation({ title: '提交College' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Object,
        isArray: true,
        description: '成功创建',
    })
    @Post('create')
    public async create(@Body() dto: CreateCollegeDto, @Req() req) {
        logger.log('called College/create');
        const result = await this.CollegeService.create(dto);
        return { id: result.id };
    }

    @ApiOperation({ title: '修改 college 信息' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Object,
        isArray: true,
        description: '成功修改',
    })
    @Put('update')
    public async update(@Body() dto: UpdateCollegeDto, @Req() req) {
        const result = await this.CollegeService.update(UpdateCollegeDto);
        return result;
    }

    @ApiOperation({ title: '获取 College 单一实例' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        isArray: true,
        description: '获取一个college',
    })
    @Get('find/:id')
    public async find(@Param('id') id: number, @Req() req) {
        const result = await this.CollegeService.findById(id);
        return result;
    }

    @ApiOperation({ title: '获取 college 全部实例' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        isArray: true,
        description: '获取成功',
    })
    @Get('list/all')
    public async list(@Query() dto: BaseDto) {
        const result = await this.CollegeService.listAll(dto);
        return result;
    }

    @ApiOperation({ title: '获取 college 分页集合' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        isArray: true,
        description: '获取成功',
    })
    @Get('list/page')
    public async pagedList(@Query() dto: PagedListDto) {
        const result = await this..CollegeService.pagedList(dto);
        return result;
    }
    @Delete('remove')
    public async delete() {}
}
