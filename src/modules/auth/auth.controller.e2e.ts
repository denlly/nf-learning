import 'reflect-metadata';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';
// import * as request from 'supertest';
import * as bodyParser from 'body-parser';
import * as faker from 'faker';
import * as config from 'config';
import { Test } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import { getManager, createConnection, getRepository, getConnection, getConnectionManager } from 'typeorm';
import { AppModule } from '../app.module';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CustomValidationPipe } from '../../common/pipes/custom-validation.pipe';
import { ErrorCode } from '../../common/constants/error-code';
import * as supertest from 'supertest';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import moment = require('moment');
import generate = require('nanoid/generate');
// const server = express();
// server.use(bodyParser.json());
const request = supertest(`http://${config.get('domain')}:${config.get('httpPort')}/${config.get('basePath')}`);
describe('AuthController', () => {
    let userService;
    const testData = {
        userName: (faker.name.firstName() + faker.name.lastName()).toLowerCase(),
        email: faker.internet.email(faker.name.firstName()).toLowerCase(),
        password: '1234567890',
        emailActivationCode: null,
        phone: `8616${generate('1234567890', 9)}`,
    };

    let testUserId;
    let jsonToken;
    const dr = true;
    // 所有测试开始前清除user表数据
    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forFeature([User]),
                TypeOrmModule.forRoot({
                    type: config.get<string>('typeorm.type') as 'mysql',
                    host: config.get<string>('typeorm.host'),
                    port: config.get<number>('typeorm.port'),
                    username: config.get<string>('typeorm.username'),
                    password: config.get<string>('typeorm.password'),
                    database: config.get<string>('typeorm.database'),
                    entities: config.get<string[]>('typeorm.entities'),
                    subscribers: config.get<string[]>('typeorm.subscribers'),
                    synchronize: config.get<boolean>('typeorm.synchronize'),
                    logging: config.get<boolean>('typeorm.logging'),
                }),
            ],
            components: [UserService],
        }).compile();
        userService = module.get<UserService>(UserService);
    });

    // 所有测试结束后清除user表数据
    afterAll(async () => {
        // await getConnection()
        //     .createQueryRunner()
        //     .query('DELETE FROM "user"');
    });

    it('POST /auth/login 400 登陆失败，用户不存在', async () => {
        const res = await request
            .post('/auth/login')
            .send({
                userName: testData.userName,
                password: testData.password,
                dr,
            })
            .expect(400);
        expect(res.body.message).toBe(ErrorCode.USER_NOT_EXIST);
        expect(res.body.token).toBeUndefined();
    });

    it('POST /auth/register 201 注册成功', async () => {
        const res = await request
            .post('/auth/register')
            .send({
                userName: testData.userName,
                password: testData.password,
                dr,
            })
            .expect(201);
        expect(res.body.id).toBeGreaterThan(0);
        expect(res.body.userName).toBe(testData.userName);
        testUserId = res.body.id;
    });

    it('POST /auth/login 201 登陆成功', async () => {
        const res = await request
            .post('/auth/login')
            .send({
                userName: testData.userName,
                password: testData.password,
                dr,
            })
            .expect(200);
        expect(res.body.token).not.toBeUndefined();
        jsonToken = res.body.token;
    });

    // it('POST /auth/register 409 注册失败，用户已存在', async () => {
    //     const res = await request
    //         .post('/auth/register')
    //         .send({ userName, password, dr })
    //         .expect(409);
    // });

    it('POST /auth/resend_activation_email 401 绑定邮箱需要登录', async () => {
        const res = await request
            .post('/auth/resend_activation_email')
            .send({ email: '12321' })
            .expect(401);
    });

    it('POST /auth/resend_activation_email 422 重发激活邮件失败。email格式错误', async () => {
        const res = await request
            .post('/auth/resend_activation_email')
            .send({ email: '12321' })
            .set('Authorization', `bearer ${jsonToken}`)
            .expect(422);
    });

    it('POST /auth/resend_activation_email 200 重发激活邮件成功', async () => {
        const res = await request
            .post('/auth/resend_activation_email')
            .send({
                email: testData.email,
            })
            .set('Authorization', `bearer ${jsonToken}`)
            .expect(200);

        expect(res.body.email).toBe(testData.email);

        const user = await getRepository<User>(User).findOne({
            where: { email: testData.email },
        });
        expect(user.emailActivationCode).not.toBeUndefined();
        expect(user.emailActivationCode).not.toBeNull();
        testData.emailActivationCode = user.emailActivationCode;
        expect(user.email).toBe(testData.email);
        expect(moment(user.emailExpiredAt).unix()).toBeGreaterThan(
            moment()
                .add(15, 'minutes')
                .unix(),
        );
    });

    it('POST /auth/resend_activation_email 406 已有的激活邮件失败', async () => {
        const res = await request
            .post('/auth/resend_activation_email')
            .send({
                email: 'fanxiaodong@gmail.com',
            })
            .set('Authorization', `bearer ${jsonToken}`)
            .expect(406);
    });

    it('PUT /auth/activation_email 422 Token格式错误', async () => {
        const res = await request
            .put('/auth/activation_email')
            .send({
                code: '123321',
            })
            .expect(422);
    });

    it('PUT /auth/activation_email 200 激活用户成功', async () => {
        const res = await request
            .put('/auth/activation_email')
            .send({
                code: testData.emailActivationCode,
            })
            .expect(200);
        const user = await getRepository<User>(User)
            .createQueryBuilder()
            .addSelect(['email_verified'])
            .where('email = :email', { email: testData.email })
            .getOne();
        expect(!!user.emailVerified).toBe(true);
        expect(user.emailActivationCode).toBeNull();
        expect(user.emailExpiredAt).toBeNull();
    });

    it('POST /auth/resend_activation_email 406 二次激活邮件不能成功', async () => {
        const res = await request
            .post('/auth/resend_activation_email')
            .send({
                email: testData.email,
            })
            .set('Authorization', `bearer ${jsonToken}`)
            .expect(406);
    });

    it('POST /auth/forget_password 422 找回密码邮件失败。phone格式错误', async () => {
        const res = await request
            .post('/auth/forget_password')
            .send({ phone: '1231231' })
            .expect(422);
    });

    it('POST /auth/forget_password 400 用户不存在', async () => {
        const res = await request
            .post('/auth/forget_password')
            .send({ phone: '13800000000' })
            .expect(400);

        expect(res.body.message).toBe(ErrorCode.USER_NOT_EXIST);
    });

    it('POST /auth/forget_password 200 忘记密码', async () => {
        // TIP: 由于绑定手机的业务没有实现因此 这个功能时候首先会在DB中写入一个没有的电话号码再执行下面的测试
        await getRepository<User>(User).update({ userName: testData.userName }, { mobileNumber: testData.phone });

        const res = await request
            .post('/auth/forget_password')
            .send({ phone: testData.phone })
            .expect(200);

        expect(res.body.mobileNumber).toBe(testData.phone);
        expect(moment(res.body.forgetPasswordTokenExpiredAt).unix()).toBeGreaterThan(
            moment()
                .add(90, 'seconds')
                .unix(),
        );
    });

    it('PUT /auth/reset_password 422 密码重置失败。重置密码token格式错误', async () => {
        const res = await request
            .put('/auth/reset_password')
            .send({ forgetPasswordToken: '12321' })
            .expect(422);
    });
    // [TODO:测试密码重置]
    it('PUT /auth/reset_password 200 密码重置成功', async () => {
        const user = await getRepository<User>(User).findOne({
            where: { mobileNumber: testData.phone },
        });
        Logger.log(JSON.stringify(user, null, 4));
        const res = await request
            .put('/auth/reset_password')
            .send({ forgetPasswordToken: user.forgetPasswordToken, newPassword: '1234567890' })
            .expect(200);
    });
});
