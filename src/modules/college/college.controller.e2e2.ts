import * as supertest from 'supertest';
import { assert } from 'chai';
import * as faker from 'faker';
import { Test } from '@nestjs/testing';
import * as config from 'config';
import { INestApplication } from '@nestjs/common';

describe('AuthController', () => {
    const request = supertest(`http://${config.get('domain')}:${config.get('httpPort')}/${config.get('basePath')}`);
    it('POST /college/create 201', async () => {
        const fakerEmail = faker.internet.email();
        const fakerPhone = faker.phone.phoneNumber();
        const res = await request
            .post('/college/create')
            .send({
                subject: '这是一个一个标题',
                userName: 'fanxiaodong e2e',
                email: fakerEmail,
                phone: fakerPhone,
                content: '这是一个随机的内容',
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(201);
        expect(res.body.id).toBeGreaterThan(0);
    });
});
