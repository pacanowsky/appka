import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SurveyDomainModule } from '../domain'
import { SurveyController } from './survey.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { SurveyByUserController } from './surveyByUser.controller'

import { ThemeDomainModule } from '../../../modules/theme/domain'

import { SurveyByThemeController } from './surveyByTheme.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    SurveyDomainModule,

    UserDomainModule,

    ThemeDomainModule,
  ],
  controllers: [
    SurveyController,

    SurveyByUserController,

    SurveyByThemeController,
  ],
  providers: [],
})
export class SurveyApplicationModule {}
