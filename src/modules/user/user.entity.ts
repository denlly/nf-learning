import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsEmail, Length, IsUUID, IsBoolean, IsOptional, IsIP, IsEnum } from 'class-validator';
import { BaseEntity } from '../../common/entitys/base.entity';
import { Language } from '../../common/constants/language';
import { isString } from '@nestjs/common/utils/shared.utils';

@Entity()
export class User extends BaseEntity {
    /**
     * 账号
     */
    @ApiModelProperty()
    @IsString()
    @Column({
        name: 'user_name',
        type: 'varchar',
        length: 100,
        unique: true,
    })
    userName: string;

    @IsString()
    @Column({ name: 'password', length: 100, select: false }) // 默认select查询中不包含password字段
    password: string | undefined;

    /**
     * 学生或者老师账号
     */
    @ApiModelProperty()
    @IsString()
    @IsOptional()
    @Column({
        name: 'pass_no',
        type: 'varchar',
        length: 100,
    })
    passNo: string;
    /**
     * 邮箱
     */
    @ApiModelProperty()
    @IsOptional()
    @Column({ name: 'email', type: 'varchar', length: 100, unique: true, default: null })
    email: string;

    /**
     * 手机号[带地区码，如8613800138000]
     */
    @IsOptional()
    @ApiModelProperty()
    @Column({ name: 'mobile_number', nullable: true })
    mobileNumber: string;

    @ApiModelProperty()
    @Column('simple-array')
    roles: string[] = ['student'];

    /**
     * 用户语言
     */
    @ApiModelProperty()
    @IsOptional()
    @Column({
        type: 'enum',
        enum: Language,
    })
    language: string;

    /**
     * 邮件激活码
     */
    @IsUUID('4')
    @IsOptional()
    @ApiModelProperty()
    @Column({
        name: 'email_activation_code',
        length: 100,
        nullable: true,
    })
    emailActivationCode: string;

    /**
     * 邮件验证码过期时间
     */
    @Column({ name: 'email_expired_at', type: 'datetime', nullable: true, default: null })
    emailExpiredAt: Date | null;

    /**
     * 邮件是否激活，默认为未激活
     */
    @IsOptional()
    @Column({ type: 'tinyint', nullable: false, name: 'email_verified', default: false })
    emailVerified: boolean;

    /**
     * 找回密码token
     */
    @IsString()
    @IsOptional()
    @Column({
        name: 'forget_password_token',
        nullable: true,
        type: 'varchar',
        length: 200,
    })
    forgetPasswordToken: string;

    /**
     * 找回密码token过期时间
     */
    @IsOptional()
    @Column({ name: 'forget_password_token_expired_at', type: 'datetime', nullable: true })
    forgetPasswordTokenExpiredAt: Date;

    /**
     * 手机激活码
     */
    @IsOptional()
    @ApiModelProperty()
    @Column({
        name: 'phone_activation_code',
        length: 20,
        nullable: true,
        select: false,
    })
    phoneActivationCode: string;

    /**
     * 邮件验证码过期时间
     */
    @IsOptional()
    @Column({ name: 'phone_expired_at', type: 'timestamp', nullable: true, select: false })
    phoneExpiredAt: Date;

    /**
     * 邮件是否激活，默认为未激活
     */
    @IsBoolean()
    @IsOptional()
    @Column({ name: 'phone_verified', type: 'tinyint', nullable: false, select: false })
    phoneVerified: boolean;

    /**
     * 注册ip
     */
    @ApiModelProperty()
    @IsIP('4')
    @Column({
        name: 'sign_up_ip',
        nullable: true,
        select: true,
    })
    signUpIp: string;

    /**
     * 最后登录ip
     */
    @IsIP('4')
    @IsOptional()
    @Column({
        name: 'logged_ip',
        nullable: true,
        select: false,
    })
    loggedIp: string;

    /**
     * 用户昵称
     */
    @IsOptional()
    @Column({
        name: 'nick_name',
        nullable: true,
    })
    nickName: string;

    /**
     * 用户备注
     */
    @IsOptional()
    @Column({
        nullable: true,
    })
    note: string;

    /**
     * 是否订阅
     */
    @ApiModelProperty()
    @Column({ default: true })
    subscribed: boolean;

    /**
     * 最后登录时间
     */
    @IsOptional()
    @Column({
        name: 'logged_at',
        type: 'timestamp',
        nullable: true,
        select: false,
    })
    loggedAt: Date;
}
