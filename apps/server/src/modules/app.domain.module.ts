import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { ThemeDomainModule } from './theme/domain'

import { SurveyDomainModule } from './survey/domain'

import { ParticipantDomainModule } from './participant/domain'

import { QuestionDomainModule } from './question/domain'

import { OptionDomainModule } from './option/domain'

import { ResponseDomainModule } from './response/domain'

import { AnswerDomainModule } from './answer/domain'

import { CommentDomainModule } from './comment/domain'

import { SurveyAccessDomainModule } from './surveyAccess/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    ThemeDomainModule,

    SurveyDomainModule,

    ParticipantDomainModule,

    QuestionDomainModule,

    OptionDomainModule,

    ResponseDomainModule,

    AnswerDomainModule,

    CommentDomainModule,

    SurveyAccessDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
