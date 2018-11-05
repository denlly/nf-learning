import { IsString, IsEmail, IsMobilePhone } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { isString } from '@nestjs/common/utils/shared.utils';
import { BaseDto } from '../../../common/base/base_dto';
import { PagedListDto } from '../../../common/base/paged_list_dto';
export class PagedListCollegeDto extends PagedListDto {}
