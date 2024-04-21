import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SurveyDomainFacade } from '@server/modules/survey/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SurveyApplicationEvent } from './survey.application.event'
import { SurveyCreateDto } from './survey.dto'

import { ThemeDomainFacade } from '../../theme/domain'

@Controller('/v1/themes')
export class SurveyByThemeController {
  constructor(
    private themeDomainFacade: ThemeDomainFacade,

    private surveyDomainFacade: SurveyDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/theme/:themeId/surveys')
  async findManyThemeId(
    @Param('themeId') themeId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.themeDomainFacade.findOneByIdOrFail(themeId)

    const items = await this.surveyDomainFacade.findManyByTheme(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/theme/:themeId/surveys')
  async createByThemeId(
    @Param('themeId') themeId: string,
    @Body() body: SurveyCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, themeId }

    const item = await this.surveyDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SurveyApplicationEvent.SurveyCreated.Payload>(
      SurveyApplicationEvent.SurveyCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
