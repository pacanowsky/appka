import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { ThemeApplicationModule } from './theme/application'

import { SurveyApplicationModule } from './survey/application'

import { ParticipantApplicationModule } from './participant/application'

import { QuestionApplicationModule } from './question/application'

import { OptionApplicationModule } from './option/application'

import { ResponseApplicationModule } from './response/application'

import { AnswerApplicationModule } from './answer/application'

import { CommentApplicationModule } from './comment/application'

import { SurveyAccessApplicationModule } from './surveyAccess/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    ThemeApplicationModule,

    SurveyApplicationModule,

    ParticipantApplicationModule,

    QuestionApplicationModule,

    OptionApplicationModule,

    ResponseApplicationModule,

    AnswerApplicationModule,

    CommentApplicationModule,

    SurveyAccessApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
