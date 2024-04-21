import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AnswerDomainFacade } from '@server/modules/answer/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AnswerApplicationEvent } from './answer.application.event'
import { AnswerCreateDto } from './answer.dto'

import { ResponseDomainFacade } from '../../response/domain'

@Controller('/v1/responses')
export class AnswerByResponseController {
  constructor(
    private responseDomainFacade: ResponseDomainFacade,

    private answerDomainFacade: AnswerDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/response/:responseId/answers')
  async findManyResponseId(
    @Param('responseId') responseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.responseDomainFacade.findOneByIdOrFail(responseId)

    const items = await this.answerDomainFacade.findManyByResponse(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/response/:responseId/answers')
  async createByResponseId(
    @Param('responseId') responseId: string,
    @Body() body: AnswerCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, responseId }

    const item = await this.answerDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AnswerApplicationEvent.AnswerCreated.Payload>(
      AnswerApplicationEvent.AnswerCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
