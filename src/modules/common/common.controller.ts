import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

import {
    Controller,
    Post,
    Put,
    Get,
    HttpStatus,
    HttpCode,
    Query,
    Body,
    Req,
    Param,
    Request,
    BadRequestException,
} from '@nestjs/common';

import { getManager } from 'typeorm';

import { User } from '../user/user.entity';
import { MailService } from '../mail/mail.service';

@ApiUseTags('Common')
@Controller('common')
export class CommonController {
    constructor() {}
}
