import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsUUID } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class ActivationDto extends BaseDto {
    @IsUUID('4')
    @ApiModelProperty()
    readonly code: string;
}
