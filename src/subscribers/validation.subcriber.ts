import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { validate } from 'class-validator';
import { HttpException, UnprocessableEntityException } from '@nestjs/common';

/**
 * 在所有Entity执行插入和更新操作时，用class-validator验证数据格式有效性
 */
@EventSubscriber()
export class ValidationSubscriber implements EntitySubscriberInterface<any> {
    // 插入前校验
    async beforeInsert(event: InsertEvent<any>) {
        const validateErrors = await validate(event.entity);
        if (validateErrors.length > 0) {
            throw new UnprocessableEntityException(validateErrors, 'Validation failed');
        }
    }

    // 更新前校验
    async beforeUpdate(event: UpdateEvent<any>) {
        const validateErrors = await validate(event.entity, {
            // 更新操作不会验证没有涉及的字段
            skipMissingProperties: true,
        });
        if (validateErrors.length > 0) {
            throw new UnprocessableEntityException(validateErrors, 'Validation failed');
        }
    }
}
