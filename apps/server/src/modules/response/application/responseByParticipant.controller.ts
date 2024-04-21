import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ResponseDomainFacade } from '@server/modules/response/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ResponseApplicationEvent } from './response.application.event'
import { ResponseCreateDto } from './response.dto'

import { ParticipantDomainFacade } from '../../participant/domain'

@Controller('/v1/participants')
export class ResponseByParticipantController {
  constructor(
    private participantDomainFacade: ParticipantDomainFacade,

    private responseDomainFacade: ResponseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/participant/:participantId/responses')
  async findManyParticipantId(
    @Param('participantId') participantId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.participantDomainFacade.findOneByIdOrFail(participantId)

    const items = await this.responseDomainFacade.findManyByParticipant(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/participant/:participantId/responses')
  async createByParticipantId(
    @Param('participantId') participantId: string,
    @Body() body: ResponseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, participantId }

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
