import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Put,
    Request,
    Response,
    UseGuards,
    Logger,
} from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { Env } from '../../common/constants/env';
import { ErrorCode } from '../../common/constants/error-code';
import { RoleType } from '../../common/constants/role-type';
import { Roles } from '../../common/decorators/roles.decorator';
import { MailService } from '../mail/mail.service';
import { RedisService } from '../redis/redis.service';
import { User } from '../user/user.entity';
import { AuthService } from './auth.service';
import { ActivationDto } from './dtos/activation.dto';
import { ForgetPasswordDto } from './dtos/forget-password.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { ResendActivationEmailDto } from './dtos/resend-activation-email.dto';
import { ResendActivationPhoneDto } from './dtos/resend-activation-phone.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
const logger = new Logger('FeedbackController');

@ApiUseTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly redisService: RedisService,
        private readonly mailService: MailService,
    ) {}

    /**
     * TODO:上线后这个要要清楚掉
     */
    @ApiOperation({ title: '注册新用户' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_ALREADY_EXIST} 用户已存在
        `,
    })
    @Post('register')
    public async register(@Body() dto: RegisterDto, @Request() req) {
        if (process.env.NODE_ENV === Env.PRODUCTION) {
            throw new BadRequestException(ErrorCode.ENV_ERROR);
        }
        const language = req.acceptsLanguages()[0];
        const signUpIp = req.get('X-Real-IP') || req.get('X-Forwarded-For') || req.ip;
        const user = await this.authService.createUser(dto, signUpIp);
        // 客户端隐藏password字段
        delete user.password;
        // await this.mailService.sendEmailToConsumer(this.mailService.registerEmail(user));
        return user;
    }

    @ApiOperation({ title: '登陆成功后返回access token' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        description: '成功返回access token',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_NOT_EXIST} 用户不存在
            ${ErrorCode.USER_PASSWORD_INCORRECT} 用户存在，但是密码错误
            ${ErrorCode.USER_UNACTIVATED_ERROR} 用户未激活，需要激活
        `,
    })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    public async login(@Body() dto: LoginDto, @Request() req, @Response() res: ExpressResponse) {
        logger.log('Called Login:' + JSON.stringify(dto));
        const loggedIp = req.get('X-Real-IP') || req.get('X-Forwarded-For') || req.ip;
        const result = await this.authService.createToken(dto, loggedIp);
        return res.status(HttpStatus.OK).json(result);
    }

    @ApiOperation({ title: '用户邮件激活验证' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_ACTIVATION_CODE_ERROR} 用户激活码错误
            ${ErrorCode.USER_ACTIVATED_ERROR} 用户已激活，不能重复激活
        `,
    })
    @HttpCode(HttpStatus.OK)
    @Put('activation_email')
    public async activationEmail(@Body() dto: ActivationDto) {
        logger.log(`Called activationEmail:${JSON.stringify(dto)}`);
        return await this.authService.activationEmail(dto.code);
    }

    @ApiOperation({ title: '用户手机号激活验证' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_ACTIVATION_CODE_ERROR} 用户激活码错误
            ${ErrorCode.USER_ACTIVATED_ERROR} 用户已激活，不能重复激活
        `,
    })
    @HttpCode(HttpStatus.OK)
    @Put('activation_phone')
    public async activationPhone(@Body() dto: ActivationDto) {
        // return await this.authService.activation(dto.code);
    }

    @ApiOperation({ title: '重发激活邮件' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_RESEND_ACTIVATION_CODE_LIMIT_ERROR} 重发激活邮件超过当天允许次数
        `,
    })
    @ApiResponse({
        status: HttpStatus.NOT_ACCEPTABLE,
        type: Object,
        description: `
            ${ErrorCode.USER_ACTIVATED_EMAIL_ERROR} 用户邮箱激活时候，用户已经激活
            ${ErrorCode.USER_ACTIVATED_EMAIL_OTHER_ONE_USED_ERROR} 用户邮箱激活时候，邮箱已经被使用
        `,
    })
    @HttpCode(HttpStatus.OK)
    @UseGuards(RolesGuard)
    @Post('resend_activation_email')
    public async resendActivationEmail(@Body() dto: ResendActivationEmailDto, @Request() req) {
        logger.log(`Called resendActivationEmail ${JSON.stringify(dto)}`);
        const currentUser = req.user;
        return await this.authService.resendActivationEmail(dto.email, currentUser);
    }

    @ApiOperation({ title: '重发激活手机' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_RESEND_ACTIVATION_CODE_LIMIT_ERROR} 重发激活邮件超过当天允许次数
        `,
    })
    @ApiResponse({
        status: HttpStatus.NOT_ACCEPTABLE,
        type: Object,
        description: `
            ${ErrorCode.USER_ACTIVATED_EMAIL_ERROR} 用户邮箱激活时候，用户已经激活
            ${ErrorCode.USER_ACTIVATED_EMAIL_OTHER_ONE_USED_ERROR} 用户邮箱激活时候，邮箱已经被使用
        `,
    })
    @HttpCode(HttpStatus.OK)
    @Post('resend_activation_phone')
    @UseGuards(RolesGuard)
    public async resendActivationPhone(@Body() dto: ResendActivationPhoneDto, @Request() req) {
        const currentUser = req.user;
        return await this.authService.resendActivationPhone(dto.phone, currentUser);
    }

    @ApiOperation({ title: '发送忘记密码邮件' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `message错误类型
            ${ErrorCode.USER_UNACTIVATED_ERROR} 用户未激活，需要激活
            ${ErrorCode.USER_SEND_FORGET_PASSWORD_TOKEN_LIMIT_ERROR} 发送找回密码邮件超过当天允许次数
        `,
    })
    @HttpCode(HttpStatus.OK)
    @Post('forget_password')
    public async forgetPassword(@Body() dto: ForgetPasswordDto, @Request() req) {
        logger.log('Called forgetPassword:' + JSON.stringify(dto, null, 4));
        const ip = req.get('X-Real-IP') || req.get('X-Forwarded-For') || req.ip;

        return await this.authService.forgetPassword(dto.phone);
    }

    @ApiOperation({ title: '通过忘记密码token修改密码' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        type: Object,
        description: '参数验证失败',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `
            ${ErrorCode.USER_FORGET_PASSWORD_TOKEN_ERROR} 忘记密码token错误
            ${ErrorCode.USER_FORGET_PASSWORD_TOKEN_EXPRIED_ERROR} 忘记密码token过期
        `,
    })
    @HttpCode(HttpStatus.OK)
    @Put('reset_password')
    public async resetPassword(@Body() dto: ResetPasswordDto) {
        return await this.authService.resetPassword(dto.forgetPasswordToken, dto.newPassword);
    }

    public async logout(@Request() req, @Response() res) {
        //
    }
}
