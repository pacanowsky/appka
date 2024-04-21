import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SurveyAccessDomainFacade } from '@server/modules/surveyAccess/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SurveyAccessApplicationEvent } from './surveyAccess.application.event'
import { SurveyAccessCreateDto } from './surveyAccess.dto'

import { SurveyDomainFacade } from '../../survey/domain'

@Controller('/v1/surveys')
export class SurveyAccessBySurveyController {
  constructor(
    private surveyDomainFacade: SurveyDomainFacade,

    private surveyAccessDomainFacade: SurveyAccessDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/survey/:surveyId/surveyAccesss')
  async findManySurveyId(
    @Param('surveyId') surveyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.surveyDomainFacade.findOneByIdOrFail(surveyId)

    const items = await this.surveyAccessDomainFacade.findManyBySurvey(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/survey/:surveyId/surveyAccesss')
  async createBySurveyId(
    @Param('surveyId') surveyId: string,
    @Body() body: SurveyAccessCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, surveyId }

    const item = await this.surveyAccessDomainFacade.create(valuesUpdated)

    await this.eventService.emit<SurveyAccessApplicationEvent.SurveyAccessCreated.Payload>(
      SurveyAccessApplicationEvent.SurveyAccessCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
