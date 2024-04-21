import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ResponseDomainModule } from '../domain'
import { ResponseController } from './response.controller'

import { SurveyDomainModule } from '../../../modules/survey/domain'

import { ResponseBySurveyController } from './responseBySurvey.controller'

import { ParticipantDomainModule } from '../../../modules/participant/domain'

import { ResponseByParticipantController } from './responseByParticipant.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ResponseDomainModule,

    SurveyDomainModule,

    ParticipantDomainModule,
  ],
  controllers: [
    ResponseController,

    ResponseBySurveyController,

    ResponseByParticipantController,
  ],
  providers: [],
})
export class ResponseApplicationModule {}
