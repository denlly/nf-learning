import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Generated,
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

@Entity('college')
export class College extends BaseEntity {
    /**
     * 学院名称
     */
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'name',
    })
    name: string;

    /**
     * 简称
     */
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'short_name',
    })
    shortName: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        name: 'university_name',
    })
    universityName: string;

    /**
     * 学院标识
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: true,
        name: 'university_index',
    })
    universityIndex: string;

    /**
     * 学院备注
     */
    @Column({
        type: 'varchar',
        length: 100,
        nullable: true,
        name: 'note',
    })
    note: string;

    /**
     * 排序索引
     */
    @Column({
        type: 'mediumint',
        nullable: true,
        default: 99,
        name: 'order_index',
    })
    orderIndex: number;
}
