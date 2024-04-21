import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ParticipantDomainModule } from '../domain'
import { ParticipantController } from './participant.controller'

import { SurveyDomainModule } from '../../../modules/survey/domain'

import { ParticipantBySurveyController } from './participantBySurvey.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ParticipantDomainModule,

    SurveyDomainModule,
  ],
  controllers: [ParticipantController, ParticipantBySurveyController],
  providers: [],
})
export class ParticipantApplicationModule {}
