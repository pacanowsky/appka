import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { OptionDomainModule } from '../domain'
import { OptionController } from './option.controller'

import { QuestionDomainModule } from '../../../modules/question/domain'

import { OptionByQuestionController } from './optionByQuestion.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    OptionDomainModule,

    QuestionDomainModule,
  ],
  controllers: [OptionController, OptionByQuestionController],
  providers: [],
})
export class OptionApplicationModule {}
