import { Component, BadRequestException, NotAcceptableException } from '@nestjs/common';
import { Repository, getManager, EntityManager } from 'typeorm';
import { classToPlain } from 'class-transformer';

import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import generate = require('nanoid/generate');
import * as bcrypt from 'bcrypt';
import { default as axios } from 'axios';

import { ErrorCode } from '../../common/constants/error-code';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from '../../common/constants/language';

import { MailService } from '../mail/mail.service';
import { CustomLoggerService } from '../../common/services/custom-logger.service';
import { RedisService } from '../redis/redis.service';

import geoip = require('geoip-lite');
import { RegisterDto } from './dtos/register.dto';
import { TypeBoolean } from '../../common/constants/type-boolean';
import { LoginDto } from './dtos/login.dto';
import { ForgetPasswordDto } from './dtos/forget-password.dto';

@Component()
export class AuthService {
    private readonly saltRounds = 10;

    // redis中重发激活邮件计数器的过期时间，单位：秒。设置时间为1天
    private readonly emailActivationCodeSendCounterKeyExpire = 24 * 60 * 60;

    private readonly logger = new CustomLoggerService('AuthService');

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
        private readonly redisService: RedisService,
    ) {}

    /**
     * 登陆。成功后返回jwt token
     *
     * @param userName 邮件
     * @param password 密码
     * @param loggedIp 登录ip
     */
    async createToken(dto: LoginDto, loggedIp: string) {
        const user = await this.getUserByUserName(dto, true);
        if (!user) {
            throw new BadRequestException(ErrorCode.USER_NOT_EXIST);
        }

        if (!(await this.compareHash(dto.password, user.password))) {
            throw new BadRequestException(ErrorCode.USER_PASSWORD_INCORRECT);
        }

        // 记录登陆ip和登陆时间
        user.loggedIp = loggedIp;
        user.loggedAt = new Date();
        await this.userRepository.save(user);

        // 返回给客户端的jwt中，不能包含用户密码
        delete user.password;

        const expiresIn = config.get<string>('auth.jwt.expiresIn');
        const secretOrKey = config.get<string>('auth.jwt.secret');
        const token = jwt.sign(classToPlain(user), secretOrKey, { expiresIn });

        return { expires: expiresIn, token };
    }

    /**
     * 验证jwt用户的有效性，看是不是在数据库中存在
     * [TODO: 如果 redis 稳定可以通过缓存进行登录状态记录]
     * @param signedUser jwt解密出的登陆用户信息
     */
    async validateUser(signedUser): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: {
                id: signedUser.id,
                userName: signedUser.userName,
            },
        });

        if (!user) {
            return false;
        }

        return true;
    }

    async getHash(password: string | undefined): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    /**
     * 通过Email获得User Entity
     *
     * @param email
     * @param selectPassword 返回数据中是否包含密码字段
     */
    async getUserByEmail(email: string, selectPassword: boolean = false): Promise<User | undefined> {
        return await this.userRepository.findOne({
            select: ['id', 'email', 'password', 'roles', 'emailVerified', 'createdAt', 'updatedAt'],
            where: {
                email: email.toLowerCase(),
            },
        });
    }

    /**
     * 通过Email获得User Entity
     *
     * @param LoginDto
     * @param selectPassword 返回数据中是否包含密码字段
     */
    async getUserByUserName(dto: LoginDto, selectPassword: boolean = false): Promise<User | undefined> {
        return await this.userRepository.findOne({
            select: ['id', 'userName', 'password', 'roles', 'emailVerified', 'createdAt', 'updatedAt'],
            where: {
                userName: dto.userName.toLowerCase(),
            },
        });
    }
    /**
     * 通过邮件激活码激活用户
     *
     * @param code 邮件激活码
     * @returns Promise<User>
     */
    async activationEmail(code: string): Promise<User> {
        let user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect(['email_activation_code', 'email_expired_at'])
            .where('user.emailActivationCode = :emailActivationCode', {
                emailActivationCode: code,
            })
            .getOne();

        // 激活码不存在
        if (!user) {
            throw new BadRequestException(ErrorCode.USER_ACTIVATION_CODE_ERROR);
        }
        // 用户已经激活过，不能重复激活
        if (user.emailVerified) {
            throw new BadRequestException(ErrorCode.USER_ACTIVATED_ERROR);
        }
        // 激活码已过期
        if (moment().isAfter(user.emailExpiredAt)) {
            throw new BadRequestException(ErrorCode.USER_ACTIVATION_CODE_EXPRIED_ERROR);
        }

        user.emailVerified = true;
        // 为了安全。激活成功后清楚清除码
        user.emailActivationCode = null;
        user.emailExpiredAt = null;
        user = await this.userRepository.save(user);

        // 删除不想返回给客户端的内容
        delete user.password;
        delete user.emailActivationCode;
        delete user.emailExpiredAt;
        delete user.phoneActivationCode;
        delete user.phoneExpiredAt;
        delete user.forgetPasswordToken;
        delete user.forgetPasswordTokenExpiredAt;

        return user;
    }

    /**
     * 重发激活邮件
     *
     * @param email 邮件
     * @returns Promise<User>
     */
    async resendActivationEmail(email: string, currentUser: User): Promise<User> {
        // 判断是否有用户账号绑定过,就算是当前用户绑定也不能重新绑定
        const user = await this.userRepository.findOne({
            where: { userName: currentUser.userName.toLowerCase() },
        });
        if (user.emailVerified) {
            throw new NotAcceptableException(ErrorCode.USER_ACTIVATED_EMAIL_ERROR);
        }
        const hasOtherUser = await this.userRepository.findOne({
            where: `email = '${email}' and user_name != '${currentUser.userName}'`,
        });
        if (hasOtherUser) {
            throw new NotAcceptableException(ErrorCode.USER_ACTIVATED_EMAIL_OTHER_ONE_USED_ERROR);
        }

        // 如果重发验证邮件次计数器存在并大于等于10，则不让继续重发。一天后才行 [TODO:这里可以采用 next() 语法实现]
        const emailActivationCodeSendCounterKey = `users:${user.id}:email_activation_code_send_counter`;
        const activationCodeSendCounter = parseFloat(
            await this.redisService.client.get(emailActivationCodeSendCounterKey),
        );
        if (activationCodeSendCounter && activationCodeSendCounter >= 10) {
            throw new BadRequestException(ErrorCode.USER_RESEND_ACTIVATION_CODE_LIMIT_ERROR);
        }
        user.email = email;
        user.emailActivationCode = uuid(); // TODO: 可以 nanoid 实现
        user.emailExpiredAt = moment()
            .add(16, 'minutes')
            .toDate();
        const result = await this.userRepository.save(user);

        // 如果重发的激活邮件时，redis中的计数器已经过期了，则先设置计数器的过期时间。不然下面直接执行incr，会出现计数器永不过期的问题
        if (!(await this.redisService.client.get(emailActivationCodeSendCounterKey))) {
            await this.redisService.client.setex(
                emailActivationCodeSendCounterKey,
                this.emailActivationCodeSendCounterKeyExpire,
                '0',
            );
        }

        // 通过redis记录用户一天重发激活邮件的次数，每个用户每天不能多于10次。利用redis的过期时间机制控制1天过期
        // 重发一次激活邮件就在redis将计数增加1
        await this.redisService.client.incr(emailActivationCodeSendCounterKey);
        // TODO: 发邮件
        // await this.mailService.sendEmailToConsumer(this.mailService.registerEmail(user));

        // 删除不想返回给客户端的内容
        delete user.emailActivationCode;
        // delete user.emailExpiredAt;
        delete user.phoneActivationCode;
        delete user.phoneExpiredAt;
        delete user.forgetPasswordToken;
        delete user.forgetPasswordTokenExpiredAt;

        return user;
    }

    /**
     * 重发激活手机
     *
     * @param email 邮件
     * @returns Promise<User>
     */
    async resendActivationPhone(phone: string, currentUser: User): Promise<User> {
        const user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect(['phone_activation_code', 'phone_expired_at'])
            .where({
                userName: currentUser.userName.toLowerCase(),
            })
            .getOne();
        const activationCode = generate('1234567890', 6);
        user.mobileNumber = phone;
        user.phoneActivationCode = activationCode;
        user.phoneExpiredAt = moment()
            .add(90, 'second')
            .toDate();
        const result = await this.userRepository.save(user);
        // TODO: 发短信

        // 删除不想返回给客户端的内容
        delete user.emailActivationCode;
        delete user.emailExpiredAt;
        delete user.phoneActivationCode;
        // delete user.phoneExpiredAt;
        delete user.forgetPasswordToken;
        delete user.forgetPasswordTokenExpiredAt;

        return user;
    }

    /**
     * 忘记密码。发送一个短信给用户的手机
     *
     * @param phone 手机号
     * @returns Promise<User>
     */
    async forgetPassword(phone: string): Promise<User> {
        let user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.forget_password_token')
            .addSelect('user.forget_password_token_expired_at')
            .where('user.mobile_number = :phone', {
                phone,
            })
            .getOne();
        // 用户不存在
        if (!user) {
            throw new BadRequestException(ErrorCode.USER_NOT_EXIST);
        }

        // const forgetPasswordSendCounterKey = `users:${user.id}:forget_password_token_send_counter`;
        // // redis中重发找回短信的过期时间，单位：秒。设置时间为1天
        // const forgetPasswordSendCounterKeyExpire = 24 * 60 * 60;

        // // 如果重发忘记密码邮件次计数器存在并大于等于5，则不让继续重发。一天后才行
        // const forgetPasswordSendCounter = parseFloat(await this.redisService.client.get(forgetPasswordSendCounterKey));
        // if (forgetPasswordSendCounter && forgetPasswordSendCounter >= 5) {
        //     throw new BadRequestException(ErrorCode.USER_SEND_FORGET_PASSWORD_TOKEN_LIMIT_ERROR);
        // }

        // 生成找回密码token，有效期2分钟
        user.forgetPasswordToken = generate('1234567890', 6);
        user.forgetPasswordTokenExpiredAt = moment()
            .add(2, 'minutes')
            .toDate();

        user = await this.userRepository.save(user);

        // // 如果重发的忘记密码邮件时，redis中的计数器已经过期了，则先设置计数器的过期时间。不然下面直接执行incr，会出现计数器永不过期的问题
        // if (!(await this.redisService.client.get(forgetPasswordSendCounterKey))) {
        //     await this.redisService.client.setex(forgetPasswordSendCounterKey, forgetPasswordSendCounterKeyExpire, '0');
        // }

        // // 通过redis记录用户一天重发忘记密码邮件的次数，每个用户每天不能多于3次。利用redis的过期时间机制控制1天过期
        // // 重发一次忘记密码邮件就在redis将计数增加1
        // await this.redisService.client.incr(forgetPasswordSendCounterKey);

        // TODO:这里需要增加一个发出短信的过程
        // await this.smsService.sendSmsToConsumer(this.smsService.forgetPasswordSms(user));

        // 删除不想返回给客户端的内容
        delete user.emailActivationCode;
        delete user.emailExpiredAt;
        delete user.phoneActivationCode;
        delete user.phoneExpiredAt;
        delete user.forgetPasswordToken;
        // delete user.forgetPasswordTokenExpiredAt;
        return user;
    }

    /**
     * 通过忘记密码邮件的token，修改密码
     *
     * @param forgetPasswordToken 忘记密码token
     * @param newPassword 新密码
     * @returns Promise<User>
     */
    async resetPassword(forgetPasswordToken: string, newPassword: string): Promise<User> {
        let user = await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.forgetPasswordToken')
            .addSelect('user.forgetPasswordTokenExpiredAt')
            .where('user.forgetPasswordToken = :forgetPasswordToken', {
                forgetPasswordToken,
            })
            .getOne();

        // 用户忘记密码token不存在
        if (!user) {
            throw new BadRequestException(ErrorCode.USER_FORGET_PASSWORD_TOKEN_ERROR);
        }
        // 用户忘记密码token已过期
        if (moment().isAfter(user.forgetPasswordTokenExpiredAt)) {
            throw new BadRequestException(ErrorCode.USER_FORGET_PASSWORD_TOKEN_EXPRIED_ERROR);
        }

        user.password = await this.getHash(newPassword);
        user.forgetPasswordToken = null; // 为了安全。修改密码成功后清楚激活码
        user.forgetPasswordTokenExpiredAt = null;
        user = await this.userRepository.save(user);

        // 删除不想返回给客户端的内容
        delete user.phoneActivationCode;
        delete user.phoneExpiredAt;
        delete user.emailActivationCode;
        delete user.emailExpiredAt;
        delete user.forgetPasswordToken;
        delete user.forgetPasswordTokenExpiredAt;

        return user;
    }

    /**
     * 注册新用户
     *
     * @param email 邮箱
     * @param password 密码
     * @param language 语言
     * @param [invitationCode] 邀请码
     * @returns User Entity
     */
    async createUser(dto: RegisterDto, signUpIp: string): Promise<User> {
        const user: User = Object.assign(new User(), { ...dto, signUpIp });
        user.password = await this.getHash(dto.password);
        const result = await this.userRepository.save(user);

        // 删除不想返回给客户端的内容
        delete result.password;
        delete result.emailActivationCode;
        delete result.emailExpiredAt;
        delete result.phoneActivationCode;
        delete result.phoneExpiredAt;
        delete result.forgetPasswordToken;
        delete result.forgetPasswordTokenExpiredAt;

        return result;
    }
}
