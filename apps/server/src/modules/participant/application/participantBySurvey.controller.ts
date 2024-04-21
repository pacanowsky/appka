import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ParticipantDomainFacade } from '@server/modules/participant/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ParticipantApplicationEvent } from './participant.application.event'
import { ParticipantCreateDto } from './participant.dto'

import { SurveyDomainFacade } from '../../survey/domain'

@Controller('/v1/surveys')
export class ParticipantBySurveyController {
  constructor(
    private surveyDomainFacade: SurveyDomainFacade,

    private participantDomainFacade: ParticipantDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/survey/:surveyId/participants')
  async findManySurveyId(
    @Param('surveyId') surveyId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.surveyDomainFacade.findOneByIdOrFail(surveyId)

    const items = await this.participantDomainFacade.findManyBySurvey(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/survey/:surveyId/participants')
  async createBySurveyId(
    @Param('surveyId') surveyId: string,
    @Body() body: ParticipantCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, surveyId }

    const item = await this.participantDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ParticipantApplicationEvent.ParticipantCreated.Payload>(
      ParticipantApplicationEvent.ParticipantCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
