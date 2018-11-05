import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class RegisterDto extends BaseDto {
    @ApiModelProperty({ example: 'fanxiaodong' })
    @IsString()
    readonly userName: string;

    @ApiModelProperty({ example: '1234567890' })
    @IsString()
    @Length(6, 20)
    readonly password: string;
}
