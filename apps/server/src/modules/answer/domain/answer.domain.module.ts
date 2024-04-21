import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AnswerDomainFacade } from './answer.domain.facade'
import { Answer } from './answer.model'

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), DatabaseHelperModule],
  providers: [AnswerDomainFacade, AnswerDomainFacade],
  exports: [AnswerDomainFacade],
})
export class AnswerDomainModule {}
