import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { QuestionDomainFacade } from './question.domain.facade'
import { Question } from './question.model'

@Module({
  imports: [TypeOrmModule.forFeature([Question]), DatabaseHelperModule],
  providers: [QuestionDomainFacade, QuestionDomainFacade],
  exports: [QuestionDomainFacade],
})
export class QuestionDomainModule {}
