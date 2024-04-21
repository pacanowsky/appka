import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { SurveyAccessDomainFacade } from '@server/modules/surveyAccess/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { SurveyAccessApplicationEvent } from './surveyAccess.application.event'
import { SurveyAccessCreateDto } from './surveyAccess.dto'

import { ParticipantDomainFacade } from '../../participant/domain'

@Controller('/v1/participants')
export class SurveyAccessByParticipantController {
  constructor(
    private participantDomainFacade: ParticipantDomainFacade,

    private surveyAccessDomainFacade: SurveyAccessDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/participant/:participantId/surveyAccesss')
  async findManyParticipantId(
    @Param('participantId') participantId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.participantDomainFacade.findOneByIdOrFail(participantId)

    const items = await this.surveyAccessDomainFacade.findManyByParticipant(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/participant/:participantId/surveyAccesss')
  async createByParticipantId(
    @Param('participantId') participantId: string,
    @Body() body: SurveyAccessCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, participantId }

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
