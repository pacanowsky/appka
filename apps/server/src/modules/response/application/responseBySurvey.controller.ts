import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ResponseDomainFacade } from '@server/modules/response/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ResponseApplicationEvent } from './response.application.event'
import { ResponseCreateDto } from './response.dto'

import { SurveyDomainFacade } from '../../survey/domain'

@Controller('/v1/surveys')
export class ResponseBySurveyController {
  constructor(
    private surveyDomainFacade: SurveyDomainFacade,

    private responseDomainFacade: ResponseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/survey/:surveyId/responses')
  async findManySurveyId(
    @Param('surveyId') surveyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.surveyDomainFacade.findOneByIdOrFail(surveyId)

    const items = await this.responseDomainFacade.findManyBySurvey(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/survey/:surveyId/responses')
  async createBySurveyId(
    @Param('surveyId') surveyId: string,
    @Body() body: ResponseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, surveyId }

    const item = await this.responseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ResponseApplicationEvent.ResponseCreated.Payload>(
      ResponseApplicationEvent.ResponseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
