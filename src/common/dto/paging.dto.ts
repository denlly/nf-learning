import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumberString, Max } from 'class-validator';

export class PagingDto {
    @IsNumberString()
    @ApiModelProperty({ example: 0 })
    readonly skip: number;

    @IsNumberString()
    @ApiModelProperty({ example: 20 })
    readonly limit: number;
}
