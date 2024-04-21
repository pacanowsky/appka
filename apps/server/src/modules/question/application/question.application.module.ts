import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { QuestionDomainModule } from '../domain'
import { QuestionController } from './question.controller'

import { SurveyDomainModule } from '../../../modules/survey/domain'

import { QuestionBySurveyController } from './questionBySurvey.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    QuestionDomainModule,

    SurveyDomainModule,
  ],
  controllers: [QuestionController, QuestionBySurveyController],
  providers: [],
})
export class QuestionApplicationModule {}
