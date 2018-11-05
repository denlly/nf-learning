import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, IsUUID, IsOptional } from 'class-validator';
import { BaseDto } from '../../../common/base/base_dto';

export class ResetPasswordDto extends BaseDto {
    @IsString()
    @Length(6, 6)
    @IsOptional()
    @ApiModelProperty()
    readonly forgetPasswordToken: string;

    @IsString()
    @Length(6, 20)
    @ApiModelProperty({ example: '123456789' })
    readonly newPassword: string;
}
