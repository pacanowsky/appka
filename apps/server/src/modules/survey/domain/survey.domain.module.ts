import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SurveyDomainFacade } from './survey.domain.facade'
import { Survey } from './survey.model'

@Module({
  imports: [TypeOrmModule.forFeature([Survey]), DatabaseHelperModule],
  providers: [SurveyDomainFacade, SurveyDomainFacade],
  exports: [SurveyDomainFacade],
})
export class SurveyDomainModule {}
