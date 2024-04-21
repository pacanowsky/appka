import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationThemeSubscriber } from './subscribers/notification.theme.subscriber'

import { NotificationSurveySubscriber } from './subscribers/notification.survey.subscriber'

import { NotificationParticipantSubscriber } from './subscribers/notification.participant.subscriber'

import { NotificationQuestionSubscriber } from './subscribers/notification.question.subscriber'

import { NotificationOptionSubscriber } from './subscribers/notification.option.subscriber'

import { NotificationResponseSubscriber } from './subscribers/notification.response.subscriber'

import { NotificationAnswerSubscriber } from './subscribers/notification.answer.subscriber'

import { NotificationCommentSubscriber } from './subscribers/notification.comment.subscriber'

import { NotificationSurveyAccessSubscriber } from './subscribers/notification.surveyAccess.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationThemeSubscriber,

    NotificationSurveySubscriber,

    NotificationParticipantSubscriber,

    NotificationQuestionSubscriber,

    NotificationOptionSubscriber,

    NotificationResponseSubscriber,

    NotificationAnswerSubscriber,

    NotificationCommentSubscriber,

    NotificationSurveyAccessSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
