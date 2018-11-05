import { Component, Inject, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial, getConnection, FindManyOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CommandBus } from '@nestjs/cqrs';
import * as uuid from 'uuid/v1';
import * as moment from 'moment';
import { User } from './user.entity';
import { RegisterCommand } from '../auth/commands/register.command';
import { ErrorCode } from '../../common/constants/error-code';

@Component()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async getUsersByConditions(options: FindManyOptions<User>): Promise<User[]> {
        return await this.userRepository.find(options);
    }

    async getUserById(id: number): Promise<User | undefined> {
        return await this.userRepository.findOneById(id);
    }

    async getUserByEmail(userEmail: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { dr: 0, email: userEmail } });
    }

    async updateUserById(id: number, partialEntity: DeepPartial<User>) {
        await this.userRepository.updateById(id, partialEntity);
    }

    public async checkUserEmailVerified(userID: number): Promise<boolean | undefined> {
        const user = await this.userRepository.findOneById(userID);

        if (!user) {
            throw new BadRequestException(ErrorCode.USER_ALREADY_EXIST);
        }

        if (user.emailVerified) {
            return true;
        } else {
            return false;
        }
    }

    async getUserPassword(userId: number): Promise<string> {
        const result = await getConnection()
            .createQueryBuilder(User, 'user')
            .select('user.password', 'password')
            .where({ id: userId })
            .getRawOne();
        return result.password;
    }
}
