import { ApiModelProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsString, IsEmail, Length, IsUUID, IsBoolean, IsOptional } from 'class-validator';

/**
 * 基础Entity，提供id、createdAt和updatedAt 3个每个表都需要的自动。每个entity都要集成改base entity
 */
export abstract class BaseEntity {
    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    // 逻辑删除标记[0为有效数据，1为逻辑删除]
    @ApiModelProperty({ type: Number })
    @Column({ type: 'tinyint', default: 0 })
    dr: boolean;

    @ApiModelProperty({ type: Date })
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ApiModelProperty({ type: Date })
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
