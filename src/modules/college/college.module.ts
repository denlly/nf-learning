import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeController } from './college.controller';
import { CollegeService } from './college.service';
import { College } from './college.entity';

@Module({
    imports: [TypeOrmModule.forFeature([College])],
    components: [CollegeService],
    controllers: [CollegeController],
    exports: [CollegeService],
})
export class CollegeModule {}
