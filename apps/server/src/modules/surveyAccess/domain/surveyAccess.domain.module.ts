import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SurveyAccessDomainFacade } from './surveyAccess.domain.facade'
import { SurveyAccess } from './surveyAccess.model'

@Module({
  imports: [TypeOrmModule.forFeature([SurveyAccess]), DatabaseHelperModule],
  providers: [SurveyAccessDomainFacade, SurveyAccessDomainFacade],
  exports: [SurveyAccessDomainFacade],
})
export class SurveyAccessDomainModule {}
