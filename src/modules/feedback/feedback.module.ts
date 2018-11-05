import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { Feedback } from './feedback.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Feedback])],
    components: [FeedbackService],
    controllers: [FeedbackController],
    exports: [FeedbackService],
})
export class FeedbackModule {}
