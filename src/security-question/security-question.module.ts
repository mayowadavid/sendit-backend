import { Module } from '@nestjs/common';
import { SecurityQuestionService } from './security-question.service';
import { SecurityQuestionResolver } from './security-question.resolver';

@Module({
  providers: [SecurityQuestionResolver, SecurityQuestionService],
})
export class SecurityQuestionModule {}
