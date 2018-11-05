import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class ResendActivationEmailDto {
    @IsString()
    @IsEmail()
    @ApiModelProperty({ example: 'fanxiaodong@gmail.com' })
    readonly email: string;
}
