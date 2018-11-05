import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsMobilePhone } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class ResendActivationPhoneDto {
    @IsString()
    @IsMobilePhone('zh-CN')
    @ApiModelProperty({ example: '13800138000' })
    readonly phone: string;
}
