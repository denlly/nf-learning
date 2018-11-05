import { IsString, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { isString } from '@nestjs/common/utils/shared.utils';
import { BaseDto } from './base_dto';

export class PagedListDto extends BaseDto {
    @ApiModelProperty({
        description: '数据集前n个跳过',
        default: 0,
        required: false,
        maxLength: 100,
    })
    skip: number;

    @ApiModelProperty({
        description: '获取数据集的数量',
        default: 8,
        required: false,
        maxLength: 20,
    })
    limit: number;
}
