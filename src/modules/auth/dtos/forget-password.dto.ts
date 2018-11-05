import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsOptional, IsMobilePhone, IsNumberString } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class ForgetPasswordDto {
    @IsString()
    @IsEmail()
    @IsOptional()
    @ApiModelProperty({ example: 'fan91163@gmail.com' })
    readonly email: string;

    @IsNumberString()
    @Length(11, 14)
    @IsOptional()
    @ApiModelProperty({ example: '15001088432' })
    readonly phone: string;
}
