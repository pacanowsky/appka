import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SurveyAccessDomainModule } from '../domain'
import { SurveyAccessController } from './surveyAccess.controller'

import { SurveyDomainModule } from '../../../modules/survey/domain'

import { SurveyAccessBySurveyController } from './surveyAccessBySurvey.controller'

import { ParticipantDomainModule } from '../../../modules/participant/domain'

import { SurveyAccessByParticipantController } from './surveyAccessByParticipant.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SurveyAccessDomainModule,

    SurveyDomainModule,

    ParticipantDomainModule,
  ],
  controllers: [
    SurveyAccessController,

    SurveyAccessBySurveyController,

    SurveyAccessByParticipantController,
  ],
  providers: [],
})
export class SurveyAccessApplicationModule {}
