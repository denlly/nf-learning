import { Roles } from '../../common/decorators/roles.decorator';
import { RoleType } from '../../common/constants/role-type';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import {
    Controller,
    Post,
    HttpStatus,
    HttpCode,
    Get,
    Body,
    Req,
    Request,
    Param,
    NotFoundException,
    UseGuards,
    ParseIntPipe,
    BadRequestException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UpdateAccountDto, SetWalletAddressDto, ModifyPasswordDto } from './dtos/update-account.dto';
import { CustomLoggerService } from '../../common/services/custom-logger.service';
import { ErrorCode } from '../../common/constants/error-code';
import { AuthService } from '../auth/auth.service';

@ApiBearerAuth()
@ApiUseTags('User')
@UseGuards(RolesGuard)
@Controller()
export class UserController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    private readonly logger = new CustomLoggerService('UserController');

    @ApiOperation({ title: '返回当前登录用户' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        type: Object,
        description: '未授权，需要登陆才能访问',
    })
    @HttpCode(HttpStatus.OK)
    @Get('user')
    public async getCurrentUser(@Req() req) {
        return await this.userService.getUserById(req.user.id);
    }

    // @ApiOperation({ title: '返回指定id用户' })
    // @ApiResponse({
    //     status: HttpStatus.OK,
    //     type: User,
    //     description: '成功返回User Entity',
    // })
    // @ApiResponse({
    //     status: HttpStatus.NOT_FOUND,
    //     type: Object,
    //     description: '用户未找到',
    // })
    // @ApiImplicitParam({
    //     name: 'id',
    //     type: Number,
    //     description: '用户Id',
    // })
    // @Get('users/:id')
    // public async getUser(
    //     @Param('id', new ParseIntPipe())
    //     id: number,
    // ) {
    //     const user = await this.userService.getUserById(id);

    //     if (!user) {
    //         throw new NotFoundException();
    //     }

    //     return user;
    // }

    @ApiOperation({ title: '查询用户邮箱是否已验证' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Object,
        description: '',
    })
    @HttpCode(HttpStatus.OK)
    @Get('user/verify_email')
    public async verifyEmail(@Req() req) {
        return await this.userService.checkUserEmailVerified(req.user.id);
    }

    @ApiOperation({ title: '用户-账户设置' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        type: Object,
        description: '未授权，需要登陆才能访问',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `message错误类型
            ${ErrorCode.SETTING_FIELD_ILLEGAL} 用户设置的字段不合法
        `,
    })
    @Roles(RoleType.STUDENT)
    @HttpCode(HttpStatus.OK)
    @Post('user/setting')
    public async updateUserAccount(@Body() dto: UpdateAccountDto, @Req() req): Promise<User | Error | undefined> {
        // 获取当前用户信息
        const user = req.user;
        const userId = user.id;
        if (userId) {
            this.logger.info('当前用户ID:' + userId);
            this.logger.info('当前字段:' + dto.field);
            switch (dto.field) {
                case 'name':
                    await this.userService.updateUserById(userId, { userName: dto.value });
                    break;
                case 'subscribed':
                    if (dto.value === 'true') {
                        await this.userService.updateUserById(userId, { subscribed: true });
                    } else if (dto.value === 'false') {
                        await this.userService.updateUserById(userId, { subscribed: false });
                    } else {
                        return new BadRequestException(ErrorCode.SETTING_FIELD_ILLEGAL);
                    }
                    break;
            }
        } else {
            // 抛出参数不合法错误
            return new BadRequestException(ErrorCode.SETTING_FIELD_ILLEGAL);
        }
        // 根据入参进行账户设置
        const userObject = await this.userService.getUserById(userId);
        return userObject;
    }

    @ApiOperation({ title: '用户-修改密码' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: User,
        description: '成功返回User Entity',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        type: Object,
        description: '未授权，需要登陆才能访问',
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: Object,
        description: `message错误类型
            ${ErrorCode.ORIGINAL_PASSWORD_ERROR} 用户原始密码错误
        `,
    })
    @Roles(RoleType.STUDENT)
    @HttpCode(HttpStatus.OK)
    @Post('user/password/reset')
    public async resetPassword(@Body() dto: ModifyPasswordDto, @Req() req): Promise<string | Error> {
        // 获取当前用户信息
        const user = req.user;
        const userId = user.id;
        if (userId) {
            // 验证密码
            const userPassword = await this.userService.getUserPassword(userId);
            this.logger.info('数据库中的密码:' + userPassword);
            const access = await this.authService.compareHash(dto.originalPwd, userPassword);
            this.logger.info('密码验证结果:' + access);
            if (access) {
                // 加密密码
                const hashPassword = await this.authService.getHash(dto.newPwd);
                // 修改密码
                await this.userService.updateUserById(userId, { password: hashPassword });
            } else {
                // 抛出密码错误
                return new BadRequestException(ErrorCode.ORIGINAL_PASSWORD_ERROR);
            }
        } else {
            // 抛出参数不合法错误
            return new BadRequestException(ErrorCode.ORIGINAL_PASSWORD_ERROR);
        }
        return 'true';
    }
}
