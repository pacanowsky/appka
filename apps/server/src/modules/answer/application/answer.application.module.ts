import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AnswerDomainModule } from '../domain'
import { AnswerController } from './answer.controller'

import { ResponseDomainModule } from '../../../modules/response/domain'

import { AnswerByResponseController } from './answerByResponse.controller'

import { QuestionDomainModule } from '../../../modules/question/domain'

import { AnswerByQuestionController } from './answerByQuestion.controller'

import { OptionDomainModule } from '../../../modules/option/domain'

import { AnswerByOptionController } from './answerByOption.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AnswerDomainModule,

    ResponseDomainModule,

    QuestionDomainModule,

    OptionDomainModule,
  ],
  controllers: [
    AnswerController,

    AnswerByResponseController,

    AnswerByQuestionController,

    AnswerByOptionController,
  ],
  providers: [],
})
export class AnswerApplicationModule {}
