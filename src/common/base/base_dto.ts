import { IsString, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { isString } from '@nestjs/common/utils/shared.utils';
import { TypeBoolean } from '../constants/type-boolean';

export class BaseDto {
    @ApiModelProperty({
        description: '是否是无效数据',
        example: true,
        default: false,
        required: false,
    })
    dr: boolean;
}
