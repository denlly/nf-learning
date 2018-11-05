import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    components: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule {}
