import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { PayStatus } from '../../common/constants/pay-status';
import { CurrencyType } from '../../common/constants/currency-type';
import { accountingCheckStatus } from '../../common/constants/accounting-check-status';
import {
    IsString,
    IsEmail,
    Length,
    IsUUID,
    IsBoolean,
    IsOptional,
    IsIP,
    IsNumber,
    IsEnum,
    IsJSON,
} from 'class-validator';
import { BaseEntity } from '../../common/entitys/base.entity';
import 'reflect-metadata';

@Entity('feedback')
export class Feedback extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    subject: string;

    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    phone: string;

    @Column({
        type: 'text',
        length: 2000,
        nullable: true,
    })
    content: string;
}
