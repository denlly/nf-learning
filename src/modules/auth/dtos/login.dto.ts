import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class LoginDto extends BaseDto {
    @IsString()
    @ApiModelProperty({ example: 'fanxiaodong' })
    readonly userName: string;

    @IsString()
    @Length(6, 20)
    @ApiModelProperty({ example: '1234567890' })
    readonly password: string;
}
