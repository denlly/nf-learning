import { IsString, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { isString } from '@nestjs/common/utils/shared.utils';
import { BaseDto } from '../../../common/base/base_dto';
export class CreateFeedbackDto extends BaseDto {
    @ApiModelProperty({ description: '标题', example: '一个标题', required: true, maxLength: 100 })
    subject: string;

    @IsString()
    @ApiModelProperty({ description: '姓名', example: 'Fun', required: false, maxLength: 100 })
    userName: string;

    @IsEmail()
    @ApiModelProperty({ description: '邮箱', example: 'fan91163@gmail.com', required: false, maxLength: 50 })
    email: string;

    @ApiModelProperty({ description: '电话号码', example: '+8613800188000', required: false, maxLength: 50 })
    phone: string;

    @ApiModelProperty({ description: '内容', example: 'I have dream!!! ', required: true, maxLength: 2000 })
    content: string;
}
